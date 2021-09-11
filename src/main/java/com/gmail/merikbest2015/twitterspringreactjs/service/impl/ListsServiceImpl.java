package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsActionType;
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
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public Lists getListById(Long listId) {
        return listsRepository.getOne(listId);
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
        } else {
            listFollowers.add(user);
        }
        return listsRepository.save(list);
    }

    @Override
    public Tweet addTweetToLists(Long tweetId, List<Long> listsIds) {
        Tweet tweet = tweetRepository.getOne(tweetId);
        List<Lists> lists = listsRepository.findByIdIn(listsIds);
        lists.forEach((list) -> {
            Optional<Tweet> tweetInList = list.getTweets().stream()
                    .filter(t -> t.equals(tweet))
                    .findFirst();

            if (tweetInList.isPresent()) {
                if (!listsIds.contains(list.getId())) {
                    list.getTweets().remove(tweet);
                    listsRepository.save(list);
                }
            } else {
                list.getTweets().add(tweet);
                listsRepository.save(list);
            }
        });
        return tweet;
    }

    public Tweet addTweetToLists2(Long tweetId, Map<Long, ListsActionType> listsIds) {
        Tweet tweet = tweetRepository.getOne(tweetId);
        listsIds.forEach((listId, listsActionType) -> {
            Lists list = listsRepository.getOne(listId);
            if (listsActionType.equals(ListsActionType.ADD)) {
                list.getTweets().add(tweet);
                listsRepository.save(list);
            }

            if (listsActionType.equals(ListsActionType.DELETE)) {
                list.getTweets().add(tweet);
                listsRepository.save(list);
            }
        });
        return tweet;
    }

}
