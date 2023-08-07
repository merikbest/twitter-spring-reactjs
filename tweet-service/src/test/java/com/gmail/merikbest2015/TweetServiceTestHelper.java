package com.gmail.merikbest2015;

import com.gmail.merikbest2015.enums.LinkCoverSize;
import com.gmail.merikbest2015.enums.ReplyType;
import com.gmail.merikbest2015.model.GifImage;
import com.gmail.merikbest2015.model.Poll;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.util.TestConstants;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class TweetServiceTestHelper {

    private static final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    public static TweetProjection createTweetProjection() {
        Map<String, Object> tweetMap = new HashMap<>();
        tweetMap.put("id", TestConstants.TWEET_ID);
        tweetMap.put("text", TestConstants.TWEET_TEXT);
        tweetMap.put("dateTime", LocalDateTime.now());
        tweetMap.put("scheduledDate", LocalDateTime.now());
        tweetMap.put("addressedUsername", TestConstants.USERNAME);
        tweetMap.put("addressedId", TestConstants.USER_ID);
        tweetMap.put("addressedTweetId", 123L);
        tweetMap.put("replyType", ReplyType.EVERYONE);
        tweetMap.put("link", TestConstants.LINK);
        tweetMap.put("linkTitle", TestConstants.LINK_TITLE);
        tweetMap.put("linkDescription", TestConstants.LINK_DESCRIPTION);
        tweetMap.put("linkCover", TestConstants.LINK_COVER);
        tweetMap.put("linkCoverSize", LinkCoverSize.LARGE);
        tweetMap.put("deleted", false);
        tweetMap.put("authorId", TestConstants.USER_ID);
        tweetMap.put("listId", TestConstants.LIST_ID);
        tweetMap.put("imageDescription", "");
        tweetMap.put("images", new ArrayList<>());
        tweetMap.put("taggedImageUsers", new ArrayList<>());
        tweetMap.put("quoteTweet", new Tweet());
        tweetMap.put("poll", new Poll());
        tweetMap.put("gifImage", new GifImage());
        tweetMap.put("replies", new ArrayList<>());
        tweetMap.put("quotes", new ArrayList<>());
        return factory.createProjection(TweetProjection.class, tweetMap);
    }
}
