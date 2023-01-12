package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.client.tag.TagClient;
import com.gmail.merikbest2015.client.user.AuthenticationClient;
import com.gmail.merikbest2015.client.user.UserClient;
import com.gmail.merikbest2015.commons.enums.LinkCoverSize;
import com.gmail.merikbest2015.commons.enums.NotificationType;
import com.gmail.merikbest2015.commons.enums.ReplyType;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.commons.models.*;
import com.gmail.merikbest2015.commons.repository.LikeTweetRepository;
import com.gmail.merikbest2015.commons.repository.NotificationRepository;
import com.gmail.merikbest2015.commons.repository.RetweetRepository;
import com.gmail.merikbest2015.commons.projection.TweetProjection;
import com.gmail.merikbest2015.commons.projection.TweetsProjection;
import com.gmail.merikbest2015.commons.projection.UserProjection;
import com.gmail.merikbest2015.commons.util.AuthUtil;
import com.gmail.merikbest2015.repository.*;
import com.gmail.merikbest2015.service.TweetService;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.math.BigDecimal;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TweetServiceImpl implements TweetService {

    private final TweetRepository tweetRepository;
    private final RetweetRepository retweetRepository;
    private final LikeTweetRepository likeTweetRepository;
    private final NotificationRepository notificationRepository;
    private final PollRepository pollRepository;
    private final PollChoiceRepository pollChoiceRepository;
    private final AuthenticationClient authenticationClient;
    private final UserClient userClient;
    private final TagClient tagClient;
    private final RestTemplate restTemplate;

    @Value("${google.api.url}")
    private String googleApiUrl;

    @Value("${google.api.key}")
    private String googleApiKey;

    @Override
    public Page<TweetProjection> getTweets(Pageable pageable) {
        return tweetRepository.findAllTweets(pageable);
    }

    @Override
    public TweetProjection getTweetById(Long tweetId) {
        TweetProjection tweet = tweetRepository.findTweetById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));

        if (tweet.isDeleted()) {
            throw new ApiRequestException("Sorry, that Tweet has been deleted.", HttpStatus.BAD_REQUEST);
        }
        return tweet;
    }

    @Override
    public TweetAdditionalInfoProjection getTweetAdditionalInfoById(Long tweetId) {
        TweetAdditionalInfoProjection additionalInfo = tweetRepository.getTweetAdditionalInfoById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));

        if (additionalInfo.isDeleted()) {
            throw new ApiRequestException("Sorry, that Tweet has been deleted.", HttpStatus.BAD_REQUEST);
        }
        return additionalInfo;
    }

    @Override
    public List<TweetProjection> getRepliesByTweetId(Long tweetId) {
        List<TweetsProjection> repliesByTweetId = tweetRepository.getRepliesByTweetId(tweetId);
        return repliesByTweetId.contains(null) ? new ArrayList<>() : repliesByTweetId.stream()
                .map(TweetsProjection::getTweet)
                .collect(Collectors.toList());
    }

    @Override
    public Page<TweetProjection> getQuotesByTweetId(Pageable pageable, Long tweetId) {
        return tweetRepository.getQuotesByTweetId(tweetId, pageable);
    }

    @Override
    public Page<UserProjection> getLikedUsersByTweetId(Long tweetId, Pageable pageable) {
        return tweetRepository.getLikedUsersByTweetId(tweetId, pageable);
    }

    @Override
    public Page<UserProjection> getRetweetedUsersByTweetId(Long tweetId, Pageable pageable) {
        return tweetRepository.getRetweetedUsersByTweetId(tweetId, pageable);
    }

    @Override
    public Page<TweetProjection> getMediaTweets(Pageable pageable) {
        return tweetRepository.findAllTweetsWithImages(pageable);
    }

    @Override
    public Page<TweetProjection> getTweetsWithVideo(Pageable pageable) {
        return tweetRepository.findAllTweetsWithVideo(pageable);
    }

    @Override
    public Page<TweetProjection> getFollowersTweets(Pageable pageable) {
        List<Long> userFollowersIds = userClient.getUserFollowersIds();
        return tweetRepository.findTweetsByUserIds(userFollowersIds, pageable);
    }

    @Override
    public Page<TweetProjection> getScheduledTweets(Pageable pageable) {
        Long userId = authenticationClient.getAuthenticatedUserId();
        return tweetRepository.findAllScheduledTweetsByUserId(userId, pageable);
    }

    @Override
    @Transactional
    public TweetProjection createNewTweet(Tweet tweet) {
        Tweet createdTweet = createTweet(tweet);
        return getTweetById(createdTweet.getId());
    }

    @Override
    @Transactional(rollbackFor = ApiRequestException.class)
    public TweetProjection createPoll(Long pollDateTime, List<String> choices, Tweet tweet) {
        if (choices.size() < 2 || choices.size() > 4) {
            throw new ApiRequestException("Incorrect poll choices", HttpStatus.BAD_REQUEST);
        }
        Tweet createdTweet = createTweet(tweet);
        LocalDateTime dateTime = LocalDateTime.now().plusMinutes(pollDateTime);
        Poll poll = new Poll();
        poll.setTweet(createdTweet);
        poll.setDateTime(dateTime);
        List<PollChoice> pollChoices = new ArrayList<>();
        choices.forEach(choice -> {
            if (choice.length() == 0 || choice.length() > 25) {
                throw new ApiRequestException("Incorrect choice text length", HttpStatus.BAD_REQUEST);
            }
            PollChoice pollChoice = new PollChoice();
            pollChoice.setChoice(choice);
            pollChoiceRepository.save(pollChoice);
            pollChoices.add(pollChoice);
        });
        poll.setPollChoices(pollChoices);
        pollRepository.save(poll);
        createdTweet.setPoll(poll);
//        tweetRepository.save(createdTweet);
        return getTweetById(createdTweet.getId());
    }

    @Override
    @Transactional
    public TweetProjection updateScheduledTweet(Tweet tweetInfo) {
        if (tweetInfo.getText().length() == 0 || tweetInfo.getText().length() > 280) {
            throw new ApiRequestException("Incorrect tweet text length", HttpStatus.BAD_REQUEST);
        }
        Tweet tweet = tweetRepository.findById(tweetInfo.getId())
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        tweet.setText(tweetInfo.getText());
        tweet.setImages(tweetInfo.getImages());
        return getTweetById(tweet.getId());
    }

    @Override
    @Transactional
    public String deleteScheduledTweets(List<Long> tweetsIds) {
        tweetsIds.forEach(this::deleteTweet);
        return "Scheduled tweets deleted.";
    }

    @Override
    @Transactional
    public String deleteTweet(Long tweetId) {
        User user = authenticationClient.getAuthenticatedUser();
        Tweet tweet = user.getTweets().stream()
                .filter(t -> t.getId().equals(tweetId))
                .findFirst()
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        if (user.getPinnedTweet() != null && user.getPinnedTweet().getId().equals(tweetId)) {
            user.setPinnedTweet(null);
        }
        List<Tag> tags = tagClient.getTagsByTweetId(tweetId);
        tags.forEach(tag -> {
            long tweetsQuantity = tag.getTweetsQuantity() - 1;

            if (tweetsQuantity == 0) {
                tagClient.deleteTag(tag);
            } else {
                tag.setTweetsQuantity(tweetsQuantity);
            }
        });
        tweet.setDeleted(true);
        return "Your Tweet was deleted";
    }

    @Override
    public Page<TweetProjection> searchTweets(String text, Pageable pageable) {
        return tweetRepository.findAllByText(text, pageable);
    }

    @Override
    @Transactional
    public Map<String, Object> likeTweet(Long tweetId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        User user = checkIsPrivateUserProfile(tweet.getUser().getId(), authUserId);

        if (isMyProfileBlockedByUser(tweet.getUser().getId())) {
            throw new ApiRequestException("User profile blocked", HttpStatus.BAD_REQUEST);
        }
        boolean isTweetLiked = likeTweetRepository.isTweetLiked(authUserId, tweetId);
        boolean likedTweet;

        if (isTweetLiked) {
            likeTweetRepository.removeLikedTweet(authUserId, tweetId);
            userClient.updateLikeCount(false);
            likedTweet = false;
        } else {
            BigDecimal id = likeTweetRepository.getNextVal();
            likeTweetRepository.addLikedTweet(id, authUserId, tweetId, LocalDateTime.now().withNano(0));
            userClient.updateLikeCount(true);
            likedTweet = true;
        }

        Notification notification = notificationHandler3(authUserId, user, tweet, NotificationType.LIKE);
        return Map.of("notification", notification, "isTweetLiked", likedTweet);
    }

//    private Notification notificationHandler2(Long authUserId, Long tweetAuthorId, Long tweetId, NotificationType notificationType) {
//        if (!tweetAuthorId.equals(authUserId)) {
//            boolean isTweetNotificationExists = notificationRepository.isTweetNotificationExists(
//                    tweetAuthorId, authUserId, tweetId, notificationType);
//
//            if (isTweetNotificationExists) {
//                BigDecimal id = notificationRepository.getNextVal();
//                LocalDateTime date = LocalDateTime.now().withNano(0); // TODO move to sql migration script
//                notificationRepository.addNotification(id, tweetAuthorId, authUserId, tweetId, notificationType, date);
//                userClient.increaseNotificationsCount(tweetAuthorId);
//                return notificationRepository.getById(id.longValue());
//            }
//        }
//        return new Notification();
//    }

    private Notification notificationHandler3(Long authUserId, User user, Tweet tweet, NotificationType notificationType) {
        Notification notification = new Notification();
        notification.setNotificationType(notificationType);
        notification.setNotifiedUser(tweet.getUser());
        notification.setUser(user);
        notification.setTweet(tweet);

        if (!tweet.getUser().getId().equals(authUserId)) {
            boolean isTweetNotificationExists = notificationRepository.isTweetNotificationExists(
                    tweet.getUser().getId(), authUserId, tweet.getId(), notificationType);

            if (!isTweetNotificationExists) {
                userClient.increaseNotificationsCount(tweet.getUser().getId());
                return notificationRepository.save(notification);
            }
        }
        return notification;
    }

    @Override
    @Transactional
    public Map<String, Object> retweet(Long tweetId) {
        User user = authenticationClient.getAuthenticatedUser();
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        List<Retweet> retweets = user.getRetweets();
        Optional<Retweet> retweet = retweets.stream()
                .filter(t -> t.getTweet().getId().equals(tweet.getId()))
                .findFirst();
        boolean isTweetRetweeted;

        if (retweet.isPresent()) {
            retweets.remove(retweet.get());
            retweetRepository.delete(retweet.get());
            user.setTweetCount(user.getTweetCount() - 1);
            isTweetRetweeted = false;
        } else {
            Retweet newRetweet = new Retweet();
            newRetweet.setTweet(tweet);
            newRetweet.setUser(user);
            retweetRepository.save(newRetweet);
            retweets.add(newRetweet);
            user.setTweetCount(user.getTweetCount() + 1);
            isTweetRetweeted = true;
        }
        Notification notification = notificationHandler(user, tweet, NotificationType.RETWEET);
        return Map.of("notification", notification, "isTweetRetweeted", isTweetRetweeted);
    }

    @Override
    @Transactional
    public TweetProjection replyTweet(Long tweetId, Tweet reply) {
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        reply.setAddressedTweetId(tweetId);
        Tweet replyTweet = createTweet(reply);
        tweet.getReplies().add(replyTweet);
        return getTweetById(replyTweet.getId());
    }

    @Override
    @Transactional
    public TweetProjection quoteTweet(Long tweetId, Tweet quote) {
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        User user = authenticationClient.getAuthenticatedUser();
        user.setTweetCount(user.getTweetCount() + 1);
        quote.setQuoteTweet(tweet);
        Tweet createdTweet = createTweet(quote);
        tweet.getQuotes().add(createdTweet);
        return getTweetById(createdTweet.getId());
    }

    @Override
    @Transactional
    public TweetProjection changeTweetReplyType(Long tweetId, ReplyType replyType) {
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        User user = authenticationClient.getAuthenticatedUser();
        user.getTweets().stream()
                .filter(userTweet -> userTweet.getId().equals(tweet.getId()))
                .findFirst()
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        tweet.setReplyType(replyType);
        return getTweetById(tweet.getId());
    }

    @Override
    @Transactional
    public TweetProjection voteInPoll(Long tweetId, Long pollId, Long pollChoiceId) {
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new ApiRequestException("Poll not found", HttpStatus.NOT_FOUND));
        PollChoice pollChoice = pollChoiceRepository.findById(pollChoiceId)
                .orElseThrow(() -> new ApiRequestException("Poll choice not found", HttpStatus.NOT_FOUND));
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));

        if (!tweet.getPoll().getId().equals(poll.getId())) {
            throw new ApiRequestException("Poll in tweet not exist", HttpStatus.NOT_FOUND);
        }
        User user = authenticationClient.getAuthenticatedUser();
        List<PollChoice> pollChoices = tweet.getPoll().getPollChoices().stream()
                .peek(choice -> {
                    if (choice.getId().equals(pollChoice.getId())) {
                        choice.getVotedUser().add(user);
                    }
                })
                .collect(Collectors.toList());
        tweet.getPoll().setPollChoices(pollChoices);
        return getTweetById(tweet.getId());
    }

    @Override
    public Boolean getIsTweetBookmarked(Long tweetId) {
        return isUserBookmarkedTweet(tweetId);
    }

    public List<Long> getRetweetsUserIds(Long tweetId) {
        List<Long> retweetsUserIds = tweetRepository.getRetweetsUserIds(tweetId);
        return retweetsUserIds.contains(null) ? new ArrayList<>() : retweetsUserIds;
    }

    public boolean isUserLikedTweet(Long tweetId) {
        Long authUserId = authenticationClient.getAuthenticatedUserId();
        return tweetRepository.isUserLikedTweet(authUserId, tweetId);
    }

    public boolean isUserRetweetedTweet(Long tweetId) {
        Long authUserId = authenticationClient.getAuthenticatedUserId();
        return tweetRepository.isUserRetweetedTweet(authUserId, tweetId);
    }

    public boolean isUserBookmarkedTweet(Long tweetId) {
        Long authUserId = authenticationClient.getAuthenticatedUserId();
        return tweetRepository.isUserBookmarkedTweet(authUserId, tweetId);
    }

    public boolean isUserFollowByOtherUser(Long userId) {
        return userClient.isUserFollowByOtherUser(userId);
    }

    public boolean isUserMutedByMyProfile(Long userId) {
        return userClient.isUserMutedByMyProfile(userId);
    }

    public boolean isUserBlockedByMyProfile(Long userId) {
        return userClient.isUserBlockedByMyProfile(userId);
    }

    public boolean isMyProfileBlockedByUser(Long userId) {
        return userClient.isMyProfileBlockedByUser(userId);
    }

    public boolean isMyProfileWaitingForApprove(Long userId) {
        return userClient.isMyProfileWaitingForApprove(userId);
    }

    public boolean isUserHavePrivateProfile(Long userId) {
        return userClient.isUserHavePrivateProfile(userId);
    }

    private User checkIsPrivateUserProfile(Long userId, Long authUserId) {
        try {
            return userClient.getValidUser(userId, authUserId);
        } catch (RuntimeException exception) {
            throw new ApiRequestException("User not found", HttpStatus.NOT_FOUND);
        }
    }

    private Notification notificationHandler(User user, Tweet tweet, NotificationType notificationType) {
        Notification notification = new Notification();
        notification.setNotificationType(notificationType);
        notification.setNotifiedUser(tweet.getUser());
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
                userClient.saveUser(tweet.getUser());
                return newNotification;
            }
        }
        return notification;
    }

    @Transactional
    public Tweet createTweet(Tweet tweet) {
        if (tweet.getText().length() == 0 || tweet.getText().length() > 280) {
            throw new ApiRequestException("Incorrect tweet text length", HttpStatus.BAD_REQUEST);
        }
        User user = authenticationClient.getAuthenticatedUser();
        tweet.setUser(user);
        boolean isMediaTweetCreated = parseMetadataFromURL(tweet); // find metadata from url
        Tweet createdTweet = tweetRepository.save(tweet);

        if (isMediaTweetCreated || createdTweet.getImages() != null) {
            user.setMediaTweetCount(user.getMediaTweetCount() + 1);
        } else {
            user.setTweetCount(user.getTweetCount() + 1);
        }
        user.getTweets().add(createdTweet);
//        userRepository.save(user);
        parseHashtagInText(tweet); // find hashtag in text

        Notification notification = new Notification();
        notification.setNotificationType(NotificationType.TWEET);
        notification.setUser(user);
        notification.setTweet(tweet);

        user.getSubscribers().forEach(subscriber -> {
            subscriber.setNotificationsCount(subscriber.getNotificationsCount() + 1);
            List<Notification> notifications = subscriber.getNotifications();
            notification.setNotifiedUser(subscriber);
            notifications.add(notification);
            notificationRepository.save(notification);
        });
        return createdTweet;
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
                Tag tag = tagClient.getTagByTagName(hashtag);

                if (tag != null) {
                    Long tweetsQuantity = tag.getTweetsQuantity();
                    tweetsQuantity = tweetsQuantity + 1;
                    tag.setTweetsQuantity(tweetsQuantity);
                    List<Tweet> taggedTweets = tag.getTweets();
                    taggedTweets.add(tweet);
                    tagClient.saveTag(tag);
                } else {
                    Tag newTag = new Tag();
                    newTag.setTagName(hashtag);
                    newTag.setTweetsQuantity(1L);
                    newTag.setTweets(Collections.singletonList(tweet));
                    tagClient.saveTag(newTag);
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
                String youtubeUrl = String.format(googleApiUrl, youTubeVideoId, googleApiKey);
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
