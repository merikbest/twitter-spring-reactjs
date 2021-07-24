package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tag;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TagRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class TweetServiceImpl implements TweetService {

    private final TweetRepository tweetRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    @Override
    public List<Tweet> getTweets() {
        return tweetRepository.findByAddressedUsernameIsNullOrderByDateTimeDesc();
    }

    @Override
    public Tweet getTweetById(Long tweetId) {
        return tweetRepository.getOne(tweetId);
    }

    @Override
    public List<Tweet> getTweetsByUser(User user) {
        return tweetRepository.findByAddressedUsernameIsNullAndUserOrderByDateTimeDesc(user);
    }

    @Override
    public List<Tweet> getMediaTweets() {
        return tweetRepository.findByImagesIsNotNullOrderByDateTimeDesc();
    }

    @Override
    public Tweet createTweet(Tweet tweet) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        tweet.setUser(user);
        Tweet createdTweet = tweetRepository.save(tweet);
        user.getTweets().add(createdTweet);
        user.setTweetCount(user.getTweetCount() + 1);
        userRepository.save(user);

        // find hashtag in text
        Pattern pattern = Pattern.compile("(#\\w+)\\b");
        Matcher match = pattern.matcher(tweet.getText());
        List<String> hashtags = new ArrayList<>();

        while (match.find()) {
            hashtags.add(match.group(1));
        }

        if (!hashtags.isEmpty()) {
            for (String hashtag : hashtags) {
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
            }
        }
        return createdTweet;
    }

    @Override
    @Transactional
    public List<Tweet> deleteTweet(Long tweetId) {
        Tweet tweet = tweetRepository.getOne(tweetId);
        tweetRepository.delete(tweet);
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        user.getTweets().remove(tweet);
        return tweetRepository.findByAddressedUsernameIsNullOrderByDateTimeDesc();
    }

    @Override
    public List<Tweet> searchTweets(String text) {
        Set<Tweet> tweets = new HashSet<>();
        List<Tweet> tweetsByText = tweetRepository.findAllByTextIgnoreCaseContaining(text);
        List<Tag> tagsByText = tagRepository.findByTagNameContaining(text);
        List<User> usersByText = userRepository.findByFullNameOrUsernameContaining(text, text);

        if (tweetsByText != null) {
            tweets.addAll(tweetsByText);
        }
        if (tagsByText != null) {
            tagsByText.forEach(tag -> tweets.addAll(tag.getTweets()));
        }
        if (usersByText != null) {
            usersByText.forEach(user -> tweets.addAll(tweetRepository.findAllByUser(user)));
        }
        return List.copyOf(tweets);
    }

    @Override
    public Tweet likeTweet(Long tweetId) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        Tweet tweet = tweetRepository.getOne(tweetId);
        List<User> tweetLikes = tweet.getLikes();

        if (tweetLikes.contains(user)) {
            tweetLikes.remove(user);
        } else {
            tweetLikes.add(user);
        }
        return tweetRepository.save(tweet);
    }

    @Override
    public Tweet retweet(Long tweetId) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        user.setTweetCount(user.getTweetCount() + 1);
        userRepository.save(user);

        Tweet tweet = tweetRepository.getOne(tweetId);
        List<Tweet> tweets = user.getTweets();
        List<User> retweets = tweet.getRetweets();

        if (tweets.contains(tweet)) {
            tweets.remove(tweet);
            retweets.remove(user);
        } else {
            tweets.add(tweet);
            retweets.add(user);
        }
        return tweetRepository.save(tweet);
    }

    @Override
    public Tweet replyTweet(Long tweetId, Tweet reply) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        user.setTweetCount(user.getTweetCount() + 1);
        userRepository.save(user);

        Tweet replyTweet = createTweet(reply);
        Tweet tweet = tweetRepository.getOne(tweetId);
        tweet.getReplies().add(replyTweet);
        return tweetRepository.save(tweet);
    }
}
