package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ImageRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ListsRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.ListsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListsServiceImpl implements ListsService {

    private final AuthenticationService authenticationService;
    private final ListsRepository listsRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;

    @Override
    public List<Lists> getAllTweetLists() {
        return listsRepository.findByIsPrivateFalse();
    }

    @Override
    public List<Lists> getUserTweetLists() {
        Long userId = authenticationService.getAuthenticatedUserId();
        return listsRepository.findByListOwner_Id(userId);
    }

    @Override
    public List<Lists> getUserPinnedLists() {
        Long userId = authenticationService.getAuthenticatedUserId();
        return listsRepository.getUserPinnedLists(userId);
    }

    @Override
    public Lists getListById(Long listId) {
        Long userId = authenticationService.getAuthenticatedUserId();
        Lists list = listsRepository.getListById(listId, userId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
        list.setTweets(mergeTweets(list));
        return list;
    }

    @Override
    public Lists createTweetList(Lists lists) {
        if (lists.getName().length() == 0 || lists.getName().length() > 25) {
            throw new ApiRequestException("Incorrect list name length", HttpStatus.BAD_REQUEST);
        }
        User user = authenticationService.getAuthenticatedUser();
        lists.setListOwner(user);
        Lists userTweetList = listsRepository.save(lists);
        List<Lists> userLists = user.getUserLists();
        userLists.add(userTweetList);
        userRepository.save(user);
        return userTweetList;
    }

    @Override
    public List<Lists> getUserTweetListsById(Long userId) { // TODO add tests
        return listsRepository.findByListOwner_IdAndIsPrivateFalse(userId);
    }

    @Override
    public List<Lists> getTweetListsWhichUserIn() { // TODO add tests
        Long userId = authenticationService.getAuthenticatedUserId();
        return listsRepository.findByMembers_Id(userId);
    }

    @Override
    public Lists editTweetList(Lists listInfo) {
        if (listInfo.getName().length() == 0 || listInfo.getName().length() > 25) {
            throw new ApiRequestException("Incorrect list name length", HttpStatus.BAD_REQUEST);
        }
        Lists listFromDb = listsRepository.findById(listInfo.getId())
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
        Long userId = authenticationService.getAuthenticatedUserId();

        if (!listFromDb.getListOwner().getId().equals(userId)) {
            throw new ApiRequestException("List owner not found", HttpStatus.NOT_FOUND);
        }
        listFromDb.setName(listInfo.getName());
        listFromDb.setDescription(listInfo.getDescription());
        listFromDb.setWallpaper(listInfo.getWallpaper());
        listFromDb.setPrivate(listInfo.isPrivate());
        Lists list = listsRepository.save(listFromDb);
        list.setTweets(mergeTweets(list));
        return list;
    }

    @Override
    public String deleteList(Long listId) {  // TODO add tests
        Long userId = authenticationService.getAuthenticatedUserId();
        Lists list = listsRepository.findById(listId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));

        if (!list.getListOwner().getId().equals(userId)) {
            throw new ApiRequestException("List owner not found", HttpStatus.BAD_REQUEST);
        }
        list.getTweets().removeAll(list.getTweets());
        list.getMembers().removeAll(list.getMembers());
        list.getFollowers().removeAll(list.getFollowers());

        if (list.getWallpaper() != null) {
            imageRepository.delete(list.getWallpaper());
        }
        listsRepository.findByListOwner_Id(userId).remove(list);
        listsRepository.delete(list);
        return "List id:" + list.getId() + " deleted.";
    }

    @Override
    public Lists followList(Long listId) {
        User user = authenticationService.getAuthenticatedUser();
        Lists list = listsRepository.findByIdAndIsPrivateFalse(listId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
        // TODO if user blocked by other user, can the user follow list???
        Optional<User> listFollower = list.getFollowers().stream()
                .filter(follower -> follower.getId().equals(user.getId()))
                .findFirst();
        List<User> listFollowers = list.getFollowers();

        if (listFollower.isPresent()) {
            listFollowers.remove(listFollower.get());
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
        Long userId = authenticationService.getAuthenticatedUserId();
        List<Lists> userLists = listsRepository.findByListOwner_Id(userId);
        Optional<Lists> list = userLists.stream()
                .filter(userList -> userList.getId().equals(listId))
                .findFirst();

        if (list.isPresent()) {
            if (list.get().getPinnedDate() == null) {
                list.get().setPinnedDate(LocalDateTime.now().withNano(0));
            } else {
                list.get().setPinnedDate(null);
            }
            return listsRepository.save(list.get());
        } else {
            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public List<Lists> addUserToLists(Long userId, List<Lists> lists) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        checkUserIsBlocked(authUserId, userId);
        User user = userRepository.getValidUser(userId, authUserId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        checkUserIsBlocked(user.getId(), authUserId);
        List<Lists> userLists = listsRepository.findByListOwner_Id(authUserId);
        Set<Lists> commonLists = userLists.stream()
                .distinct()
                .filter(lists::contains)
                .collect(Collectors.toSet());
        commonLists.forEach((list) -> {
            Optional<User> userInList = list.getMembers().stream()
                    .filter(member -> member.getId().equals(user.getId()))
                    .findFirst();

            userLists.forEach((userList) -> {
                Optional<User> memberInUserList = userList.getMembers().stream()
                        .filter(member -> member.getId().equals(user.getId()))
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
        Long authUserId = authenticationService.getAuthenticatedUserId();
        checkUserIsBlocked(authUserId, userId);
        User user = userRepository.getValidUser(userId, authUserId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        checkUserIsBlocked(user.getId(), authUserId);
        Lists list = listsRepository.findById(listId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
        Optional<User> listMember = list.getMembers().stream()
                .filter(member -> member.getId().equals(user.getId()))
                .findFirst();

        if (listMember.isPresent()) {
            list.getMembers().remove(user);
        } else {
            list.getMembers().add(user);
        }
        listsRepository.save(list);
        list.setTweets(mergeTweets(list));
        return list;
    }

    private void checkUserIsBlocked(Long userId, Long supposedBlockedUserId) {
        boolean isPresent = userRepository.isUserBlocked(userId, supposedBlockedUserId);

        if (isPresent) {
            throw new ApiRequestException("User with ID:" + supposedBlockedUserId +" is blocked", HttpStatus.BAD_REQUEST);
        }
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
