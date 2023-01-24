package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.*;
import com.gmail.merikbest2015.dto.lists.UserIdsRequest;
import com.gmail.merikbest2015.dto.notification.NotificationResponse;
import com.gmail.merikbest2015.enums.LinkCoverSize;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.feign.TagClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.LikeTweet;
import com.gmail.merikbest2015.model.Poll;
import com.gmail.merikbest2015.model.PollChoice;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.*;
import com.gmail.merikbest2015.repository.projection.TweetAdditionalInfoProjection;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetsProjection;
import com.gmail.merikbest2015.service.TweetService;
import com.gmail.merikbest2015.util.AuthUtil;
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
import java.net.URL;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class TweetServiceImpl implements TweetService {

    private final TweetRepository tweetRepository;
    private final PollRepository pollRepository;
    private final PollChoiceRepository pollChoiceRepository;
    private final LikeTweetRepository likeTweetRepository;
    private final RetweetRepository retweetRepository;
    private final BookmarkRepository bookmarkRepository;
    private final NotificationClient notificationClient;
    private final UserClient userClient;
    private final TagClient tagClient;

    private final RestTemplate restTemplate;

//    private final RetweetRepository retweetRepository;
//    private final LikeTweetRepository likeTweetRepository;
//    private final NotificationRepository notificationRepository;
//    private final AuthenticationClient authenticationClient;

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
        // TODO add check: isMyProfileBlocked, IsUserHavePrivateProfile
        TweetProjection tweet = tweetRepository.findTweetById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        checkIsTweetDeleted(tweet.isDeleted());
        return tweet;
    }

    @Override
    public TweetAdditionalInfoProjection getTweetAdditionalInfoById(Long tweetId) {
        // TODO add check: isMyProfileBlocked, IsUserHavePrivateProfile
        TweetAdditionalInfoProjection additionalInfo = tweetRepository.getTweetAdditionalInfoById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        checkIsTweetDeleted(additionalInfo.isDeleted());
        return additionalInfo;
    }

    @Override
    public List<TweetProjection> getRepliesByTweetId(Long tweetId) {
        return tweetRepository.getRepliesByTweetId(tweetId);
    }

    @Override
    public Page<TweetProjection> getQuotesByTweetId(Pageable pageable, Long tweetId) {
        return tweetRepository.getQuotesByTweetId(tweetId, pageable);
    }

    @Override
    public HeaderResponse<UserResponse> getLikedUsersByTweetId(Long tweetId, Pageable pageable) {
        Page<Long> likedUserIds = likeTweetRepository.getLikedUserIds(tweetId, pageable);
        return userClient.getTweetLikedUsersByIds(new UserIdsRequest(likedUserIds.getContent()), pageable);
    }

    @Override
    public HeaderResponse<UserResponse> getRetweetedUsersByTweetId(Long tweetId, Pageable pageable) {
        Page<Long> retweetedUserIds = retweetRepository.getRetweetedUserIds(tweetId, pageable);
        return userClient.getRetweetedUsersByIds(new UserIdsRequest(retweetedUserIds.getContent()), pageable);
    }

    @Override
    public Page<TweetProjection> getMediaTweets(Pageable pageable) {
        return tweetRepository.getMediaTweets(pageable);
    }

    @Override
    public Page<TweetProjection> getTweetsWithVideo(Pageable pageable) {
        return tweetRepository.getTweetsWithVideo(pageable);
    }

    @Override
    public Page<TweetProjection> getFollowersTweets(Pageable pageable) {
        List<Long> userFollowersIds = userClient.getUserFollowersIds();
        return tweetRepository.getFollowersTweets(userFollowersIds, pageable);
    }

    @Override
    public Page<TweetProjection> getScheduledTweets(Pageable pageable) {
        Long userId = AuthUtil.getAuthenticatedUserId();
        return tweetRepository.getScheduledTweets(userId, pageable);
    }

    @Override
    @Transactional
    public TweetProjection createNewTweet(Tweet tweet) {
        Tweet createdTweet = createTweet(tweet);
        return getTweetById(createdTweet.getId());
    }

    @Override
    @Transactional
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
        return getTweetById(createdTweet.getId());
    }

    @Override
    @Transactional
    public TweetProjection updateScheduledTweet(Tweet tweetInfo) {
        Tweet tweet = tweetRepository.findById(tweetInfo.getId())
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        checkTweetTextLength(tweetInfo.getText());
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
        Long userId = AuthUtil.getAuthenticatedUserId();
        Tweet tweet = tweetRepository.getTweetByUserId(userId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        userClient.updatePinnedTweetId(tweetId);
        tagClient.deleteTagsByTweetId(tweetId);
        tweet.setDeleted(true);
        return "Your Tweet was deleted";
    }

    @Override
    public Page<TweetProjection> searchTweets(String text, Pageable pageable) {
        List<Long> userIds = tweetRepository.getUserIdsByTweetText(text);
        List<Long> validUserIds = userClient.getValidUserIds(new UserIdsRequest(userIds), text);
        return tweetRepository.findAllByText(validUserIds, pageable);
    }

    @Override
    @Transactional
    public NotificationResponse likeTweet(Long tweetId) {
        Long userId = AuthUtil.getAuthenticatedUserId();
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        checkIsValidUserProfile(tweet.getAuthorId());
        LikeTweet likedTweet = likeTweetRepository.getLikedTweet(userId, tweetId);
        boolean isTweetLiked;

        if (likedTweet != null) {
            likeTweetRepository.delete(likedTweet);
            userClient.updateLikeCount(false);
            isTweetLiked = false;
        } else {
            LikeTweet newLikeTweet = new LikeTweet(userId, tweetId);
            likeTweetRepository.save(newLikeTweet);
            userClient.updateLikeCount(true);
            isTweetLiked = true;
        }
        return notificationClient.sendTweetNotification(new NotificationRequest(NotificationType.LIKE, isTweetLiked,
                tweet.getAuthorId(), userId, tweetId));
    }

//    @Override
//    @Transactional
//    public Map<String, Object> retweet(Long tweetId) {
//        User authUser = userClient.getAuthNotificationUser(AuthUtil.getAuthenticatedUserId());
//        Tweet tweet = tweetRepository.findById(tweetId)
//                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
//        checkIsValidUserProfile(tweet.getUser().getId());
//        boolean isTweetRetweeted = retweetRepository.isTweetRetweeted(authUser.getId(), tweet.getId());
//        boolean retweeted;
//
//        if (isTweetRetweeted) {
//            retweetRepository.removeRetweetedTweet(authUser.getId(), tweet.getId());
//            userClient.updateTweetCount(false);
//            retweeted = false;
//        } else {
//            BigDecimal id = retweetRepository.getNextVal();
//            retweetRepository.addRetweetedTweet(id, authUser.getId(), tweet.getId());
//            userClient.updateTweetCount(true);
//            retweeted = true;
//        }
//        return notificationHandler(authUser, tweet, NotificationType.RETWEET, retweeted);
//    }
//
//    @Override
//    @Transactional
//    public TweetProjection replyTweet(Long tweetId, Tweet reply) {
//        Tweet tweet = tweetRepository.findById(tweetId)
//                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
//        checkIsValidUserProfile(tweet.getUser().getId());
//        reply.setAddressedTweetId(tweetId);
//        Tweet replyTweet = createTweet(reply);
//        tweetRepository.addReply(tweetId, replyTweet.getId());
//        return tweetRepository.findTweetById(replyTweet.getId()).get();
//    }
//
//    @Override
//    @Transactional
//    public TweetProjection quoteTweet(Long tweetId, Tweet quote) {
//        Tweet tweet = tweetRepository.findById(tweetId)
//                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
//        User user = authenticationClient.getAuthenticatedUser();
//        user.setTweetCount(user.getTweetCount() + 1);
//        quote.setQuoteTweet(tweet);
//        Tweet createdTweet = createTweet(quote);
//        tweet.getQuotes().add(createdTweet);
//        return getTweetById(createdTweet.getId());
//    }
//
//    @Override
//    @Transactional
//    public TweetProjection changeTweetReplyType(Long tweetId, ReplyType replyType) {
//        Tweet tweet = tweetRepository.findById(tweetId)
//                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
//        User user = authenticationClient.getAuthenticatedUser();
//        user.getTweets().stream()
//                .filter(userTweet -> userTweet.getId().equals(tweet.getId()))
//                .findFirst()
//                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
//        tweet.setReplyType(replyType);
//        return getTweetById(tweet.getId());
//    }
//
//    @Override
//    @Transactional
//    public TweetProjection voteInPoll(Long tweetId, Long pollId, Long pollChoiceId) {
//        Poll poll = pollRepository.findById(pollId)
//                .orElseThrow(() -> new ApiRequestException("Poll not found", HttpStatus.NOT_FOUND));
//        PollChoice pollChoice = pollChoiceRepository.findById(pollChoiceId)
//                .orElseThrow(() -> new ApiRequestException("Poll choice not found", HttpStatus.NOT_FOUND));
//        Tweet tweet = tweetRepository.findById(tweetId)
//                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
//
//        if (!tweet.getPoll().getId().equals(poll.getId())) {
//            throw new ApiRequestException("Poll in tweet not exist", HttpStatus.NOT_FOUND);
//        }
//        User user = authenticationClient.getAuthenticatedUser();
//        List<PollChoice> pollChoices = tweet.getPoll().getPollChoices().stream()
//                .peek(choice -> {
//                    if (choice.getId().equals(pollChoice.getId())) {
//                        choice.getVotedUser().add(user);
//                    }
//                })
//                .collect(Collectors.toList());
//        tweet.getPoll().setPollChoices(pollChoices);
//        return getTweetById(tweet.getId());
//    }
//
//    @Override
//    public Boolean getIsTweetBookmarked(Long tweetId) {
//        return isUserBookmarkedTweet(tweetId);
//    }
//
//    public List<Long> getRetweetsUserIds(Long tweetId) {
//        List<Long> retweetsUserIds = tweetRepository.getRetweetsUserIds(tweetId);
//        return retweetsUserIds.contains(null) ? new ArrayList<>() : retweetsUserIds;
//    }

    public boolean isUserLikedTweet(Long tweetId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return likeTweetRepository.isUserLikedTweet(authUserId, tweetId);
    }

    public boolean isUserRetweetedTweet(Long tweetId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return retweetRepository.isUserRetweetedTweet(authUserId, tweetId);
    }

    public boolean isUserBookmarkedTweet(Long tweetId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return bookmarkRepository.isUserBookmarkedTweet(authUserId, tweetId);
    }

    public boolean isUserFollowByOtherUser(Long userId) {
        return userClient.isUserFollowByOtherUser(userId);
    }

//    public boolean isUserMutedByMyProfile(Long userId) {
//        return userClient.isUserMutedByMyProfile(userId);
//    }
//
//    public boolean isUserBlockedByMyProfile(Long userId) {
//        return userClient.isUserBlockedByMyProfile(userId);
//    }

    public boolean isMyProfileBlockedByUser(Long userId) {
        return userClient.isMyProfileBlockedByUser(userId);
    }

//    public boolean isMyProfileWaitingForApprove(Long userId) {
//        return userClient.isMyProfileWaitingForApprove(userId);
//    }

    public TweetAuthorResponse getTweetAuthor(Long userId) { // NEW
        return userClient.getTweetAuthor(userId);
    }

    public TweetAdditionalInfoUserResponse getTweetAdditionalInfoUser(Long userId) { // NEW
        return userClient.getTweetAdditionalInfoUser(userId);
    }

    private void checkTweetTextLength(String text) { // NEW
        if (text.length() == 0 || text.length() > 280) {
            throw new ApiRequestException("Incorrect tweet text length", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkIsTweetDeleted(boolean isDeleted) {
        if (isDeleted) {
            throw new ApiRequestException("Sorry, that Tweet has been deleted.", HttpStatus.BAD_REQUEST);
        }
    }

    public boolean isUserHavePrivateProfile(Long userId) {
        return userClient.isUserHavePrivateProfile(userId);
    }

    private void checkIsValidUserProfile(Long userId) {
        if (isUserHavePrivateProfile(userId)) {
            throw new ApiRequestException("User not found", HttpStatus.BAD_REQUEST);
        }
        if (isMyProfileBlockedByUser(userId)) {
            throw new ApiRequestException("User profile blocked", HttpStatus.BAD_REQUEST);
        }
    }

//    private Map<String, Object> notificationHandler(User authUser, Tweet tweet, NotificationType notificationType,
//                                                    boolean notificationCondition) {
//        Notification notification = new Notification();
//        notification.setNotificationType(notificationType);
//        notification.setNotifiedUser(tweet.getUser());
//        notification.setUser(authUser);
//        notification.setTweet(tweet);
//
//        if (!tweet.getUser().getId().equals(authUser.getId())) {
//            boolean isTweetNotificationExists = notificationRepository.isTweetNotificationExists(
//                    tweet.getUser().getId(), authUser.getId(), tweet.getId(), notificationType);
//
//            if (!isTweetNotificationExists) {
//                userClient.increaseNotificationsCount(tweet.getUser().getId());
//                Notification newNotification = notificationRepository.save(notification);
//                return Map.of("notification", newNotification, "notificationCondition", notificationCondition);
//            }
//        }
//        return Map.of("notification", notification, "notificationCondition", notificationCondition);
//    }

    @Transactional
    public Tweet createTweet(Tweet tweet) {
        checkTweetTextLength(tweet.getText());
        Long userId = AuthUtil.getAuthenticatedUserId();
        tweet.setAuthorId(userId);
        boolean isMediaTweetCreated = parseMetadataFromURL(tweet);
        tweetRepository.save(tweet);

        if (isMediaTweetCreated || tweet.getImages() != null) {
            userClient.updateMediaTweetCount(true);
        } else {
            userClient.updateTweetCount(true);
        }
        tagClient.parseHashtagsInText(tweet.getText(), tweet.getId());
        notificationClient.sendTweetNotificationToSubscribers(tweet.getId());
        return tweet;
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
