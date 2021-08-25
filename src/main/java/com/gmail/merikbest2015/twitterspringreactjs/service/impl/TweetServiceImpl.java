package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.model.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.*;
import com.gmail.merikbest2015.twitterspringreactjs.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class TweetServiceImpl implements TweetService {

    private final TweetRepository tweetRepository;
    private final UserRepository userRepository;
    private final RetweetRepository retweetRepository;
    private final LikeTweetRepository likeTweetRepository;
    private final NotificationRepository notificationRepository;
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
    public Notification likeTweet(Long tweetId) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        Tweet tweet = tweetRepository.getOne(tweetId);

        List<LikeTweet> likedTweets = user.getLikedTweets();
        Optional<LikeTweet> likedTweet = likedTweets.stream()
                .filter(t -> t.getTweet().equals(tweet))
                .findFirst();

        if (likedTweet.isPresent()) {
            likedTweets.remove(likedTweet.get());
            likeTweetRepository.delete(likedTweet.get());
        } else {
            LikeTweet newLikedTweet = new LikeTweet();
            newLikedTweet.setTweet(tweet);
            newLikedTweet.setUser(user);
            likeTweetRepository.save(newLikedTweet);
            likedTweets.add(newLikedTweet);
        }

        Optional<Notification> notification = tweet.getUser().getNotifications().stream()
                .filter(n -> n.getNotificationType().equals(NotificationType.LIKE))
                .filter(n -> n.getTweet().equals(tweet))
                .filter(n -> n.getUser().equals(user))
                .findFirst();

        if (notification.isEmpty()) {
            Notification newNotification = new Notification();
            newNotification.setNotificationType(NotificationType.LIKE);
            newNotification.setUser(user);
            newNotification.setTweet(tweet);
            notificationRepository.save(newNotification);
            tweet.getUser().setNotificationsCount(tweet.getUser().getNotificationsCount() + 1);
            List<Notification> notifications = tweet.getUser().getNotifications();
            notifications.add(newNotification);
            return newNotification;
        }
        return notification.get();
    }

    @Override
    public Notification retweet(Long tweetId) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
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

        Optional<Notification> notification = tweet.getUser().getNotifications().stream()
                .filter(n -> n.getNotificationType().equals(NotificationType.RETWEET))
                .filter(n -> n.getTweet().equals(tweet))
                .filter(n -> n.getUser().equals(user))
                .findFirst();

        if (notification.isEmpty()) {
            Notification newNotification = new Notification();
            newNotification.setNotificationType(NotificationType.RETWEET);
            newNotification.setUser(user);
            newNotification.setTweet(tweet);
            notificationRepository.save(newNotification);
            tweet.getUser().setNotificationsCount(tweet.getUser().getNotificationsCount() + 1);
            List<Notification> notifications = tweet.getUser().getNotifications();
            notifications.add(newNotification);
            return newNotification;
        }
        return notification.get();
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
