package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;

import java.util.List;

public interface ListsService {

    List<Lists> getAllTweetLists();

    List<Lists> getUserTweetLists();

    Lists getListById(Long listId);

    Lists createTweetList(Lists lists);

    Lists followList(Long listId);

    List<Lists> addTweetToLists(Long tweetId, List<Lists> lists);

    List<Lists> addUserToLists(Long userId, List<Lists> lists);

    Lists addUserToList(Long userId, Long listId);
}
