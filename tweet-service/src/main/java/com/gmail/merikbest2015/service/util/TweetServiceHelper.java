package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.broker.producer.TagProducer;
import com.gmail.merikbest2015.broker.producer.TweetNotificationProducer;
import com.gmail.merikbest2015.broker.producer.UpdateTweetCountProducer;
import com.gmail.merikbest2015.commons.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.commons.enums.LinkCoverSize;
import com.gmail.merikbest2015.commons.enums.NotificationType;
import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
public class TweetServiceHelper {

    private final TweetRepository tweetRepository;
    private final TweetValidationHelper tweetValidationHelper;
    private final UpdateTweetCountProducer updateTweetCountProducer;
    private final TweetNotificationProducer tweetNotificationProducer;
    private final UserService userService;
    private final TagProducer tagProducer;
    private final BasicMapper basicMapper;

    @Value("${google.api.url}")
    private String googleApiUrl;

    @Value("${google.api.key}")
    private String googleApiKey;

    @Transactional
    public TweetResponse createTweet(Tweet tweet) {
        tweetValidationHelper.checkTweetTextLength(tweet.getText());
        User authUser = userService.getAuthUser();
        tweet.setAuthor(authUser);
        boolean isMediaTweetCreated = parseMetadataFromURL(tweet);
        tweetRepository.save(tweet);

        if (tweet.getScheduledDate() == null) {
            if (isMediaTweetCreated || !tweet.getImages().isEmpty()) {
                updateTweetCountProducer.sendUpdateMediaTweetCountEvent(authUser.getId(), true);
            } else {
                updateTweetCountProducer.sendUpdateTweetCountEvent(authUser.getId(), true);
            }
        }
        return processTweetResponse(tweet, authUser);
    }

    @SneakyThrows
    public boolean parseMetadataFromURL(Tweet tweet) {
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
                Document doc = Jsoup.connect(url).get();
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

    public TweetResponse processTweetResponse(Tweet tweet, User authUser) {
        TweetProjection tweetProjection = tweetRepository.getTweetById(tweet.getId(), TweetProjection.class).get();
        TweetResponse tweetResponse = basicMapper.convertToResponse(tweetProjection, TweetResponse.class);
        sendUserReplyMention(tweet, authUser);
        sendUserMentions(tweet, authUser);
        tagProducer.parseHashtag(tweet.getId(), tweet.getText());
        tweetNotificationProducer.sendTweetSubscriberNotificationEvent(tweet, authUser);
        return tweetResponse;
    }

    private void sendUserReplyMention(Tweet tweet, User authUser) {
        if (tweet.getAddressedUser() != null) {
            userService.getUserById(tweet.getAddressedUser().getId())
                    .ifPresent(user ->
                            tweetNotificationProducer.sendTweetMentionNotificationEvent(NotificationType.REPLY, tweet, user, authUser));
        }
    }

    private void sendUserMentions(Tweet tweet, User authUser) {
        parseUserMentionFromText(tweet.getText()).forEach(username -> userService.getUserIdByUsername(username)
                .ifPresent(user ->
                        tweetNotificationProducer.sendTweetMentionNotificationEvent(NotificationType.MENTION, tweet, user, authUser)));
    }

    private List<String> parseUserMentionFromText(String tweetText) {
        Pattern pattern = Pattern.compile("(@\\w+)\\b");
        Matcher match = pattern.matcher(tweetText);
        List<String> usernames = new ArrayList<>();
        while (match.find()) {
            usernames.add(match.group(1));
        }
        return usernames;
    }
}
