package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.request.TweetTextRequest;
import com.gmail.merikbest2015.enums.LinkCoverSize;
import com.gmail.merikbest2015.enums.ReplyType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.ImageClient;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.feign.TagClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.TweetImage;
import com.gmail.merikbest2015.repository.RetweetRepository;
import com.gmail.merikbest2015.repository.TweetImageRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.service.TweetService;
import com.gmail.merikbest2015.util.AuthUtil;
import com.gmail.merikbest2015.util.TweetServiceHelper;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.net.URL;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.gmail.merikbest2015.constants.ErrorMessage.TWEET_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class TweetServiceImpl implements TweetService {

    private final TweetRepository tweetRepository;
    private final TweetServiceHelper tweetServiceHelper;
    private final TweetImageRepository tweetImageRepository;
    private final RetweetRepository retweetRepository;
    private final NotificationClient notificationClient;
    private final UserClient userClient;
    private final TagClient tagClient;
    private final ImageClient imageClient;

    @Value("${google.api.url}")
    private String googleApiUrl;

    @Value("${google.api.key}")
    private String googleApiKey;

    @Override
    public Page<TweetProjection> getTweets(Pageable pageable) {
        List<Long> validUserIds = tweetServiceHelper.getValidUserIds();
        return tweetRepository.getTweetsByAuthorIds(validUserIds, pageable);
    }

    @Override
    public TweetProjection getTweetById(Long tweetId) {
        TweetProjection tweet = tweetRepository.getTweetById(tweetId, TweetProjection.class)
                .orElseThrow(() -> new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND));
        tweetServiceHelper.validateTweet(tweet.isDeleted(), tweet.getAuthorId());
        return tweet;
    }

    @Override
    public Page<TweetUserProjection> getUserTweets(Long userId, Pageable pageable) {
        tweetServiceHelper.validateUserProfile(userId);
        List<TweetUserProjection> tweets = tweetRepository.getTweetsByUserId(userId);
        List<RetweetProjection> retweets = retweetRepository.getRetweetsByUserId(userId);
        List<TweetUserProjection> userTweets = tweetServiceHelper.combineTweetsArrays(tweets, retweets);
        Long pinnedTweetId = userClient.getUserPinnedTweetId(userId);

        if (pinnedTweetId != null) {
            TweetUserProjection pinnedTweet = tweetRepository.getTweetById(pinnedTweetId, TweetUserProjection.class).get();
            boolean isTweetExist = userTweets.removeIf(tweet -> tweet.getId().equals(pinnedTweet.getId()));

            if (isTweetExist) {
                userTweets.add(0, pinnedTweet);
            }
        }
        return tweetServiceHelper.getPageableTweetProjectionList(pageable, userTweets, tweets.size() + retweets.size());
    }

    @Override
    public Page<TweetProjection> getUserMediaTweets(Long userId, Pageable pageable) {
        tweetServiceHelper.validateUserProfile(userId);
        return tweetRepository.getUserMediaTweets(userId, pageable);
    }

    @Override
    public Page<TweetProjection> getUserMentions(Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return tweetRepository.getUserMentions(authUserId, pageable);
    }

    @Override
    public List<ProfileTweetImageProjection> getUserTweetImages(Long userId) {
        tweetServiceHelper.validateUserProfile(userId);
        return tweetRepository.getUserTweetImages(userId, PageRequest.of(0, 6));
    }

    @Override
    public TweetAdditionalInfoProjection getTweetAdditionalInfoById(Long tweetId) {
        TweetAdditionalInfoProjection additionalInfo = tweetRepository.getTweetById(tweetId, TweetAdditionalInfoProjection.class)
                .orElseThrow(() -> new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND));
        tweetServiceHelper.validateTweet(additionalInfo.isDeleted(), additionalInfo.getAuthorId());
        return additionalInfo;
    }

    @Override
    public List<TweetProjection> getRepliesByTweetId(Long tweetId) {
        tweetServiceHelper.checkValidTweet(tweetId);
        return tweetRepository.getRepliesByTweetId(tweetId);
    }

    @Override
    public Page<TweetProjection> getQuotesByTweetId(Pageable pageable, Long tweetId) {
        tweetServiceHelper.checkValidTweet(tweetId);
        List<Long> validUserIds = tweetServiceHelper.getValidUserIds();
        return tweetRepository.getQuotesByTweetId(validUserIds, tweetId, pageable);
    }

    @Override
    public Page<TweetProjection> getMediaTweets(Pageable pageable) {
        List<Long> validUserIds = tweetServiceHelper.getValidUserIds();
        return tweetRepository.getMediaTweets(validUserIds, pageable);
    }

    @Override
    public Page<TweetProjection> getTweetsWithVideo(Pageable pageable) {
        List<Long> validUserIds = tweetServiceHelper.getValidUserIds();
        return tweetRepository.getTweetsWithVideo(validUserIds, pageable);
    }

    @Override
    public Page<TweetProjection> getFollowersTweets(Pageable pageable) {
        List<Long> userFollowersIds = userClient.getUserFollowersIds();
        return tweetRepository.getFollowersTweets(userFollowersIds, pageable);
    }

    @Override
    public TweetImage uploadTweetImage(MultipartFile file) {
        String imageSrc = imageClient.uploadImage(file);
        return tweetImageRepository.save(new TweetImage(imageSrc));
    }

    @Override
    @Transactional
    public TweetProjection createNewTweet(Tweet tweet) {
        Tweet createdTweet = createTweet(tweet);
        return getTweetById(createdTweet.getId());
    }

    @Override
    @Transactional
    public String deleteTweet(Long tweetId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Tweet tweet = tweetRepository.getTweetByUserId(authUserId, tweetId)
                .orElseThrow(() -> new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND));
        userClient.updatePinnedTweetId(tweetId);
        tagClient.deleteTagsByTweetId(tweetId);
        tweet.setDeleted(true);
        return "Your Tweet was deleted";
    }

    @Override
    public Page<TweetProjection> searchTweets(String text, Pageable pageable) {
        List<Long> userIds = tweetRepository.getUserIdsByTweetText(text);
        List<Long> validUserIds = userClient.getValidTweetUserIds(new IdsRequest(userIds), text);
        return tweetRepository.searchTweets(text, validUserIds, pageable);
    }

    @Override
    @Transactional
    public TweetProjection replyTweet(Long tweetId, Tweet reply) {
        tweetServiceHelper.checkValidTweet(tweetId);
        reply.setAddressedTweetId(tweetId);
        Tweet replyTweet = createTweet(reply);
        tweetRepository.addReply(tweetId, replyTweet.getId());
        return tweetRepository.getTweetById(replyTweet.getId(), TweetProjection.class).get();
    }

    @Override
    @Transactional
    public TweetProjection quoteTweet(Long tweetId, Tweet quote) {
        Tweet tweet = tweetServiceHelper.checkValidTweet(tweetId);
        userClient.updateTweetCount(true);
        quote.setQuoteTweet(tweet);
        Tweet createdTweet = createTweet(quote);
        tweet.getQuotes().add(createdTweet);
        return getTweetById(createdTweet.getId());
    }

    @Override
    @Transactional
    public TweetProjection changeTweetReplyType(Long tweetId, ReplyType replyType) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Tweet tweet = tweetRepository.getTweetByAuthorIdAndTweetId(tweetId, authUserId)
                .orElseThrow(() -> new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND));

        if (!tweet.getAuthorId().equals(authUserId)) {
            throw new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        tweet.setReplyType(replyType);
        return getTweetById(tweet.getId());
    }

    @Transactional
    public Tweet createTweet(Tweet tweet) {
        tweetServiceHelper.checkTweetTextLength(tweet.getText());
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        tweet.setAuthorId(authUserId);
        boolean isMediaTweetCreated = parseMetadataFromURL(tweet);
        tweetRepository.save(tweet);

        if (isMediaTweetCreated || tweet.getImages() != null) {
            userClient.updateMediaTweetCount(true);
        } else {
            userClient.updateTweetCount(true);
        }
        tagClient.parseHashtagsInText(tweet.getId(), new TweetTextRequest(tweet.getText()));
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
                RestTemplate restTemplate = new RestTemplate();
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
