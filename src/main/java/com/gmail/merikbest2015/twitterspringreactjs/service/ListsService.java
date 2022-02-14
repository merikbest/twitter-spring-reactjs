package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.BaseListProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.ListProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.ListUserProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.PinnedListProjection;

import java.util.List;

public interface ListsService {

    List<ListProjection> getAllTweetLists();

    List<ListUserProjection> getUserTweetLists();

    List<PinnedListProjection> getUserPinnedLists();

    BaseListProjection getListById(Long listId);

    ListUserProjection createTweetList(Lists lists);

    List<ListProjection> getUserTweetListsById(Long userId);

    List<ListProjection> getTweetListsWhichUserIn();

    Lists editTweetList(Lists lists);

    String deleteList(Long listId);

    Lists followList(Long listId);

    Lists pinList(Long listId);

    List<Lists> addUserToLists(Long userId, List<Lists> lists);

    Lists addUserToList(Long userId, Long listId);
}
