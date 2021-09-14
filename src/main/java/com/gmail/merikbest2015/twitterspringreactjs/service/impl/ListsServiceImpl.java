package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ListsRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.service.ListsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListsServiceImpl implements ListsService {

    private final ListsRepository listsRepository;
    private final UserRepository userRepository;
    private final TweetRepository tweetRepository;

    @Override
    public List<Lists> getAllTweetLists() {
        return listsRepository.findAll();
    }

    @Override
    public List<Lists> getUserTweetLists() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        return user.getUserLists();
    }

    @Override
    public List<Lists> getUserPinnedLists() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        return user.getUserLists().stream()
                .filter(list -> list.getPinnedDate() != null)
                .sorted(Comparator.comparing(Lists::getPinnedDate).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public Lists getListById(Long listId) {
        Lists list = listsRepository.getOne(listId);
        List<Tweet> sortedTweets = mergeTweets(list);
        list.setTweets(sortedTweets);
        return list;
    }

    @Override
    public Lists createTweetList(Lists lists) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        lists.setListOwner(user);
        Lists userTweetList = listsRepository.save(lists);
        List<Lists> userLists = user.getUserLists();
        userLists.add(userTweetList);
        userRepository.save(user);
        return userTweetList;
    }

    @Override
    public Lists followList(Long listId) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        Lists list = listsRepository.getOne(listId);
        Optional<User> follower = list.getFollowers().stream()
                .filter(f -> f.equals(user))
                .findFirst();
        List<User> listFollowers = list.getFollowers();

        if (follower.isPresent()) {
            listFollowers.remove(follower.get());
            if (list.getPinnedDate() != null) {
                list.setPinnedDate(null);
            }
            user.getUserLists().remove(list);
        } else {
            listFollowers.add(user);
            user.getUserLists().add(list);
        }
        userRepository.save(user);
        return listsRepository.save(list);
    }

    @Override
    public Lists pinList(Long listId) {
        Lists list = listsRepository.getOne(listId);

        if (list.getPinnedDate() == null) {
            list.setPinnedDate(LocalDateTime.now().withNano(0));
        } else {
            list.setPinnedDate(null);
        }
        return listsRepository.save(list);
    }

    @Override
    public List<Lists> addTweetToLists(Long tweetId, List<Lists> lists) {
        Tweet tweet = tweetRepository.getOne(tweetId);
        List<Lists> userLists = getUserTweetLists();

        lists.forEach((list) -> {
            Optional<Tweet> tweetInList = list.getTweets().stream()
                    .filter(t -> t.getId().equals(tweet.getId()))
                    .findFirst();

            userLists.forEach((userList) -> {
                Optional<Tweet> tweetInUserList = userList.getTweets().stream()
                        .filter(t -> t.getId().equals(tweet.getId()))
                        .findFirst();

                if (list.getId().equals(userList.getId())) {
                    if (tweetInList.isPresent() && tweetInUserList.isEmpty()) {
                        userList.getTweets().add(tweet);
                        listsRepository.save(userList);
                    }
                    if (tweetInList.isEmpty() && tweetInUserList.isPresent()) {
                        userList.getTweets().remove(tweet);
                        listsRepository.save(userList);
                    }
                }
            });
        });
        return userLists;
    }

    @Override
    public List<Lists> addUserToLists(Long userId, List<Lists> lists) {
        User user = userRepository.getOne(userId);
        List<Lists> userLists = getUserTweetLists();

        lists.forEach((list) -> {
            Optional<User> userInList = list.getMembers().stream()
                    .filter(m -> m.getId().equals(user.getId()))
                    .findFirst();

            userLists.forEach((userList) -> {
                Optional<User> memberInUserList = userList.getMembers().stream()
                        .filter(m -> m.getId().equals(user.getId()))
                        .findFirst();

                if (list.getId().equals(userList.getId())) {
                    if (userInList.isPresent() && memberInUserList.isEmpty()) {
                        userList.getMembers().add(user);
                        listsRepository.save(userList);
                    }
                    if (userInList.isEmpty() && memberInUserList.isPresent()) {
                        userList.getMembers().remove(user);
                        listsRepository.save(userList);
                    }
                }
            });
        });
        return userLists;
    }

    @Override
    public Lists addUserToList(Long userId, Long listId) {
        User user = userRepository.getOne(userId);
        Lists list = listsRepository.getOne(listId);
        Optional<User> member = list.getMembers().stream()
                .filter(m -> m.equals(user))
                .findFirst();

        if (member.isPresent()) {
            list.getMembers().remove(user);
        } else {
            list.getMembers().add(user);
        }
        listsRepository.save(list);
        List<Tweet> sortedTweets = mergeTweets(list);
        list.setTweets(sortedTweets);
        return list;
    }

    private List<Tweet> mergeTweets(Lists list) {
        List<Tweet> tweets = list.getTweets();
        List<User> members = list.getMembers();
        members.forEach(member -> tweets.addAll(member.getTweets()));
        return tweets.stream()
                .filter(tweet -> tweet.getAddressedUsername() == null)
                .sorted(Comparator.comparing(Tweet::getDateTime).reversed())
                .collect(Collectors.toList());
    }
}
