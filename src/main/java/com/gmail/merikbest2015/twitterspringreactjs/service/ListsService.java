package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.*;

import java.util.List;

public interface ListsService {

    List<ListProjection> getAllTweetLists();

    List<ListUserProjection> getUserTweetLists();

    List<PinnedListProjection> getUserPinnedLists();

    BaseListProjection getListById(Long listId);

    ListUserProjection createTweetList(Lists lists);

    List<ListProjection> getUserTweetListsById(Long userId);

    List<ListProjection> getTweetListsWhichUserIn();

    BaseListProjection editTweetList(Lists lists);

    String deleteList(Long listId);

    Boolean followList(Long listId);

    Boolean pinList(Long listId);

    List<Long> addUserToLists(Long userId, List<Lists> lists);

    Boolean addUserToList(Long userId, Long listId);

    List<TweetProjection> getTweetsByListId(Long listId);

    BaseListProjection getListDetails(Long listId);

    List<ListMemberProjection> getListMembers(Long listId);
}
