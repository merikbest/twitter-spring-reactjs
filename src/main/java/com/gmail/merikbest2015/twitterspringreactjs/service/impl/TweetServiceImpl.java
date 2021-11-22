package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.model.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.*;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.TweetService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TweetServiceImpl implements TweetService {

    private final AuthenticationService authenticationService;
    private final TweetRepository tweetRepository;
    private final UserRepository userRepository;
    private final RetweetRepository retweetRepository;
    private final LikeTweetRepository likeTweetRepository;
    private final NotificationRepository notificationRepository;
    private final ImageRepository imageRepository;
    private final TagRepository tagRepository;
    private final PollRepository pollRepository;
    private final PollChoiceRepository pollChoiceRepository;
    private final BookmarkRepository bookmarkRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final RestTemplate restTemplate;

    @Value("${google.api.key}")
    private String googleApiKey;

    @Override
    public Page<Tweet> getTweets(Pageable pageable) {
        return tweetRepository.findAllTweets(pageable);
    }

    @Override
    public Tweet getTweetById(Long tweetId) {
        return tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<Tweet> getMediaTweets(Pageable pageable) {
        return tweetRepository.findAllTweetsWithImages(pageable);
    }

    @Override
    public Page<Tweet> getTweetsWithVideo(Pageable pageable) {
        return tweetRepository.findAllTweetsWithVideo(pageable);
    }

    @Override
    public List<Tweet> getScheduledTweets() {
        User user = authenticationService.getAuthenticatedUser();
        return tweetRepository.findAllScheduledTweetsByUserId(user.getId());
    }

    @Override
    public Tweet createTweet(Tweet tweet) {
        User user = authenticationService.getAuthenticatedUser();
        tweet.setUser(user);
        boolean isMediaTweetCreated = parseMetadataFromURL(tweet); // find metadata from url
        Tweet createdTweet = tweetRepository.save(tweet);

        if (isMediaTweetCreated || createdTweet.getImages() != null) {
            user.setMediaTweetCount(user.getMediaTweetCount() + 1);
        } else {
            user.setTweetCount(user.getTweetCount() + 1);
        }
        user.getTweets().add(createdTweet);
        userRepository.save(user);
        parseHashtagInText(tweet); // find hashtag in text
        return createdTweet;
    }

    @Override
    public Tweet createPoll(Long pollDateTime, List<String> choices, Tweet tweet) {
        Tweet createdTweet = createTweet(tweet);
        LocalDateTime dateTime = LocalDateTime.now().plusMinutes(pollDateTime);
        Poll poll = new Poll();
        poll.setTweet(createdTweet);
        poll.setDateTime(dateTime);
        List<PollChoice> pollChoices = new ArrayList<>();
        choices.forEach(choice -> {
            PollChoice pollChoice = new PollChoice();
            pollChoice.setChoice(choice);
            pollChoiceRepository.save(pollChoice);
            pollChoices.add(pollChoice);
        });
        poll.setPollChoices(pollChoices);
        pollRepository.save(poll);
        createdTweet.setPoll(poll);
        return tweetRepository.save(createdTweet);
    }

    @Override
    public Tweet updateScheduledTweet(Tweet tweetInfo) {
        Tweet tweet = tweetRepository.getOne(tweetInfo.getId());
        tweet.setText(tweetInfo.getText());
        tweet.setImages(tweetInfo.getImages());
        return tweetRepository.save(tweet);
    }

    @Override
    public String deleteScheduledTweets(List<Long> tweetsIds) {
        tweetsIds.forEach(this::deleteTweet);
        return "Scheduled tweets deleted.";
    }

    @Override
    public Tweet deleteTweet(Long tweetId) {
        User user = authenticationService.getAuthenticatedUser();
        Tweet tweet = user.getTweets().stream()
                .filter(t -> t.getId().equals(tweetId))
                .findFirst().get();
        imageRepository.deleteAll(tweet.getImages());
        likeTweetRepository.deleteAll(tweet.getLikedTweets());
        retweetRepository.deleteAll(tweet.getRetweets());
        tweet.getReplies().forEach(reply -> reply.getUser().getTweets()
                .removeIf(replyingTweet -> replyingTweet.equals(reply)));
        List<Tweet> replies = new ArrayList<>(tweet.getReplies());
        tweet.getReplies().removeAll(tweet.getReplies());
        tweetRepository.deleteAll(replies);
        List<Notification> notifications = user.getNotifications().stream()
                .filter(notification -> !notification.getNotificationType().equals(NotificationType.FOLLOW)
                        && notification.getTweet().getId().equals(tweet.getId()))
                .collect(Collectors.toList());
        notifications.forEach(notification -> {
            user.getNotifications().remove(notification);
            notificationRepository.delete(notification);
        });
        List<Bookmark> bookmarks = user.getBookmarks();
        Optional<Bookmark> bookmark = bookmarks.stream()
                .filter(b -> b.getTweet().equals(tweet))
                .findFirst();
        if (bookmark.isPresent()) {
            bookmarks.remove(bookmark.get());
            bookmarkRepository.delete(bookmark.get());
        }
        if (tweet.getAddressedTweetId() != null) {
            Tweet addressedTweet = tweetRepository.getOne(tweet.getAddressedTweetId());
            List<Tweet> addressedTweetReplies = addressedTweet.getReplies();
            Tweet reply = addressedTweetReplies.stream()
                    .filter(r -> r.equals(tweet))
                    .findFirst().get();
            addressedTweetReplies.remove(reply);
            user.getTweets().remove(tweet);
            tweetRepository.delete(tweet);
            return addressedTweet;
        }
        List<Tag> tags = tagRepository.findByTweets_Id(tweetId);
        tags.forEach(tag -> {
            tag.getTweets().remove(tweet);
            long tweetsQuantity = tag.getTweetsQuantity() - 1;

            if (tweetsQuantity == 0) {
                tagRepository.delete(tag);
            } else {
                tag.setTweetsQuantity(tweetsQuantity);
            }
        });
        List<User> unreadMessagesWithTweet = userRepository.findByUnreadMessages_Tweet(tweet);
        unreadMessagesWithTweet
                .forEach(user1 -> user1.getUnreadMessages()
                        .removeIf(chatMessage -> chatMessage.getTweet() != null
                                && chatMessage.getTweet().getId().equals(tweet.getId())));
        List<ChatMessage> messagesWithTweet = chatMessageRepository.findByTweet(tweet);
        chatMessageRepository.deleteAll(messagesWithTweet);

        List<Tweet> tweetsWithQuote = tweetRepository.findByQuoteTweetId(tweetId);
        tweetsWithQuote.forEach(quote -> quote.setQuoteTweet(null));

        if (user.getPinnedTweet() != null) {
            user.setPinnedTweet(null);
        }
        user.getTweets().remove(tweet);
        tweetRepository.delete(tweet);
        return tweet;
    }

    @Override
    public List<Tweet> searchTweets(String text) {
        Set<Tweet> tweets = new HashSet<>();
        List<Tweet> tweetsByText = tweetRepository.findAllByText(text);
        List<Tag> tagsByText = tagRepository.findByTagNameContaining(text);
        List<User> usersByText = userRepository.findByFullNameOrUsernameContainingIgnoreCase(text, text);

        if (tweetsByText != null) {
            tweets.addAll(tweetsByText);
        }
        if (tagsByText != null) {
            tagsByText.forEach(tag -> tweets.addAll(tag.getTweets()));
        }
        if (usersByText != null) {
            usersByText.forEach(user -> tweets.addAll(tweetRepository.findAllByUserId(user.getId())));
        }
        return List.copyOf(tweets);
    }

    @Override
    public Notification likeTweet(Long tweetId) {
        User user = authenticationService.getAuthenticatedUser();
        Tweet tweet = tweetRepository.getOne(tweetId);

        List<LikeTweet> likedTweets = user.getLikedTweets();
        Optional<LikeTweet> likedTweet = likedTweets.stream()
                .filter(t -> t.getTweet().equals(tweet))
                .findFirst();

        if (likedTweet.isPresent()) {
            likedTweets.remove(likedTweet.get());
            likeTweetRepository.delete(likedTweet.get());
            user.setLikeCount(user.getLikeCount() - 1);
        } else {
            LikeTweet newLikedTweet = new LikeTweet();
            newLikedTweet.setTweet(tweet);
            newLikedTweet.setUser(user);
            user.setLikeCount(user.getLikeCount() + 1);
            likeTweetRepository.save(newLikedTweet);
            likedTweets.add(newLikedTweet);
        }
        return notificationHandler(user, tweet, NotificationType.LIKE);
    }

    @Override
    public Notification retweet(Long tweetId) {
        User user = authenticationService.getAuthenticatedUser();
        Tweet tweet = tweetRepository.getOne(tweetId);

        List<Retweet> retweets = user.getRetweets();
        Optional<Retweet> retweet = retweets.stream()
                .filter(t -> t.getTweet().equals(tweet))
                .findFirst();

        if (retweet.isPresent()) {
            retweets.remove(retweet.get());
            retweetRepository.delete(retweet.get());
            user.setTweetCount(user.getTweetCount() - 1);
        } else {
            Retweet newRetweet = new Retweet();
            newRetweet.setTweet(tweet);
            newRetweet.setUser(user);
            retweetRepository.save(newRetweet);
            retweets.add(newRetweet);
            user.setTweetCount(user.getTweetCount() + 1);
        }
        return notificationHandler(user, tweet, NotificationType.RETWEET);
    }

    @Override
    public Tweet replyTweet(Long tweetId, Tweet reply) {
        reply.setAddressedTweetId(tweetId);
        Tweet replyTweet = createTweet(reply);
        Tweet tweet = tweetRepository.getOne(tweetId);
        tweet.getReplies().add(replyTweet);
        return tweetRepository.save(tweet);
    }

    @Override
    public Tweet quoteTweet(Long tweetId, Tweet quote) {
        User user = authenticationService.getAuthenticatedUser();
        user.setTweetCount(user.getTweetCount() + 1);
        userRepository.save(user);

        Tweet tweet = tweetRepository.getOne(tweetId);
        quote.setQuoteTweet(tweet);
        return createTweet(quote);
    }

    @Override
    public Tweet changeTweetReplyType(Long tweetId, ReplyType replyType) {
        Tweet tweet = tweetRepository.getOne(tweetId);
        tweet.setReplyType(replyType);
        return tweetRepository.save(tweet);
    }

    @Override
    public Tweet voteInPoll(Long tweetId, Long pollChoiceId) {
        User user = authenticationService.getAuthenticatedUser();
        Tweet tweet = tweetRepository.getOne(tweetId);
        List<PollChoice> pollChoices = tweet.getPoll().getPollChoices().stream()
                .peek(choice -> {
                    if (choice.getId().equals(pollChoiceId)) {
                        choice.getVotedUser().add(user);
                    }
                })
                .collect(Collectors.toList());
        tweet.getPoll().setPollChoices(pollChoices);
        return tweetRepository.save(tweet);
    }

    private Notification notificationHandler(User user, Tweet tweet, NotificationType notificationType) {
        Notification notification = new Notification();
        notification.setNotificationType(notificationType);
        notification.setUser(user);
        notification.setTweet(tweet);

        if (!tweet.getUser().getId().equals(user.getId())) {
            Optional<Notification> userNotification = tweet.getUser().getNotifications().stream()
                    .filter(n -> n.getNotificationType().equals(notificationType)
                            && n.getTweet().equals(tweet)
                            && n.getUser().equals(user))
                    .findFirst();

            if (userNotification.isEmpty()) {
                Notification newNotification = notificationRepository.save(notification);
                tweet.getUser().setNotificationsCount(tweet.getUser().getNotificationsCount() + 1);
                List<Notification> notifications = tweet.getUser().getNotifications();
                notifications.add(newNotification);
                return newNotification;
            }
            tweetRepository.save(tweet);
        }
        userRepository.save(user);
        return notification;
    }

    private void parseHashtagInText(Tweet tweet) {
        Pattern pattern = Pattern.compile("(#\\w+)\\b");
        Matcher match = pattern.matcher(tweet.getText());
        List<String> hashtags = new ArrayList<>();

        while (match.find()) {
            hashtags.add(match.group(1));
        }

        if (!hashtags.isEmpty()) {
            hashtags.forEach(hashtag -> {
                Tag tag = tagRepository.findByTagName(hashtag);

                if (tag != null) {
                    Long tweetsQuantity = tag.getTweetsQuantity();
                    tweetsQuantity = tweetsQuantity + 1;
                    tag.setTweetsQuantity(tweetsQuantity);
                    List<Tweet> taggedTweets = tag.getTweets();
                    taggedTweets.add(tweet);
                    tagRepository.save(tag);
                } else {
                    Tag newTag = new Tag();
                    newTag.setTagName(hashtag);
                    newTag.setTweetsQuantity(1L);
                    newTag.setTweets(Collections.singletonList(tweet));
                    tagRepository.save(newTag);
                }
            });
        }
    }

    @SneakyThrows
    private boolean parseMetadataFromURL(Tweet tweet) {
        Pattern urlRegex = Pattern.compile("https?:\\/\\/?[\\w\\d\\._\\-%\\/\\?=&#]+", Pattern.CASE_INSENSITIVE);
        Pattern imgRegex = Pattern.compile("\\.(jpeg|jpg|gif|png)$", Pattern.CASE_INSENSITIVE);
        Pattern youTubeUrlRegex = Pattern.compile("(?<=watch\\?v=|/videos/|embed\\/|youtu.be\\/|\\/v\\/|\\/e\\/|watch\\?v%3D|watch\\?feature=player_embedded&v=|%2Fvideos%2F|embed%\u200C\u200B2F|youtu.be%2F|%2Fv%2F)[^#\\&\\?\\n]*", Pattern.CASE_INSENSITIVE);
        String text = tweet.getText();
        Matcher matcher = urlRegex.matcher(text);

        if (matcher.find()) {
            String url = text.substring(matcher.start(), matcher.end());
            matcher = imgRegex.matcher(url);
            tweet.setLink(url);

            if (matcher.find()) {
                tweet.setLinkCover(url);
            } else if (!url.contains("youtu")) {
                Document doc = Jsoup.connect(url).get(); // TODO add error handler
                Elements title = doc.select("meta[name$=title],meta[property$=title]");
                Elements description = doc.select("meta[name$=description],meta[property$=description]");
                Elements cover = doc.select("meta[name$=image],meta[property$=image]");

                BufferedImage coverData = ImageIO.read(new URL(getContent(cover.first())));
                double coverDataSize = (504.0 / (double) coverData.getWidth()) * coverData.getHeight();

                tweet.setLinkTitle(getContent(title.first()));
                tweet.setLinkDescription(getContent(description.first()));
                tweet.setLinkCover(getContent(cover.first()));
                tweet.setLinkCoverSize(coverDataSize > 267.0 ? LinkCoverSize.SMALL : LinkCoverSize.LARGE);
            } else {
                String youTubeVideoId = null;
                Matcher youTubeMatcher = youTubeUrlRegex.matcher(url);

                if (youTubeMatcher.find()) {
                    youTubeVideoId = youTubeMatcher.group();
                }
                String youtubeUrl = String.format(
                        "https://www.googleapis.com/youtube/v3/videos?id=%s&key=%s&part=snippet,contentDetails,statistics,status",
                        youTubeVideoId, googleApiKey);
                String youTubeVideData = restTemplate.getForObject(youtubeUrl, String.class);
                JSONObject jsonObject = new JSONObject(youTubeVideData);
                JSONArray items = jsonObject.getJSONArray("items");
                String videoTitle = null;
                String videoCoverImage = null;

                for (int i = 0; i < items.length(); i++) {
                    videoTitle = items.getJSONObject(i)
                            .getJSONObject("snippet")
                            .getString("title");
                    videoCoverImage = items.getJSONObject(i)
                            .getJSONObject("snippet")
                            .getJSONObject("thumbnails")
                            .getJSONObject("medium")
                            .getString("url");
                }
                tweet.setLinkTitle(videoTitle);
                tweet.setLinkCover(videoCoverImage);
                return true;
            }
        }
        return false;
    }

    private String getContent(Element element) {
        return element == null ? "" : element.attr("content");
    }
}
