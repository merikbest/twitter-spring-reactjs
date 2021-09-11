package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;

import java.util.List;

public interface ListsService {

    List<Lists> getAllTweetLists();

    List<Lists> getUserTweetLists();

    Lists getListById(Long listId);

    Lists createTweetList(Lists lists);

    Lists followList(Long listId);

    Tweet addTweetToLists(Long tweetId, List<Long> listsIds);
}
