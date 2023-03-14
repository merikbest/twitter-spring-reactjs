import React from "react";
import { Avatar, Button } from "@material-ui/core";
import { createMemoryHistory } from "history";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockUserProfile } from "../../../../util/test-utils/mock-test-data";
import ConversationInfo from "../ConversationInfo";
import Spinner from "../../../../components/Spinner/Spinner";
import { UserProfileActionsType } from "../../../../store/ducks/userProfile/contracts/actionTypes";
import BlockUserModal from "../../../../components/BlockUserModal/BlockUserModal";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import UnfollowModal from "../../../../components/UnfollowModal/UnfollowModal";
import LeaveFromConversationModal from "../LeaveFromConversationModal/LeaveFromConversationModal";
import { ChatsActionsType } from "../../../../store/ducks/chats/contracts/actionTypes";
import { MESSAGES } from "../../../../constants/path-constants";
import { LoadingStatus } from "../../../../types/common";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("ConversationInfo", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockUserProfileStore = {
        ...mockStore,
        userProfile: { ...mockStore.userProfile, user: mockUserProfile }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, createMockRootState());

        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(wrapper.text().includes("Conversation info")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { participantId: 1, chatId: 1 },
            type: UserProfileActionsType.FETCH_CHAT_PARTICIPANT
        });
    });

    it("should render ConversationInfo correctly", () => {
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, mockUserProfileStore);

        expect(wrapper.find(Avatar).prop("src")).toBe(mockUserProfile.avatar);
        expect(wrapper.text().includes(mockUserProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockUserProfile.username}`)).toBe(true);
        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
        expect(wrapper.text().includes("Notifications")).toBe(true);
        expect(wrapper.text().includes(`Snooze notifications from ${mockUserProfile.fullName}`)).toBe(true);
        expect(wrapper.text().includes(`Block  @${mockUserProfile.username}`)).toBe(true);
        expect(wrapper.text().includes(`Report @${mockUserProfile.username}`)).toBe(true);
        expect(wrapper.text().includes("Leave conversation")).toBe(true);
    });

    it("should block participant", () => {
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, mockUserProfileStore);

        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);

        wrapper.find("#onOpenBlockUserModal").simulate("click");

        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);

        wrapper.find(BlockUserModal).find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(2, {
            payload: { userId: 1 },
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: `@${mockUserProfile?.username!} has been blocked.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should close block modal window", () => {
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, mockUserProfileStore);

        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);

        wrapper.find("#onOpenBlockUserModal").simulate("click");

        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);

        wrapper.find(BlockUserModal).find(Button).at(1).simulate("click");

        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
    });

    it("should open unfollow modal and unfollow participant", () => {
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, mockUserProfileStore);

        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(false);

        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unfollow")).toBe(true);

        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Following")).toBe(true);

        wrapper.find(Button).simulate("click");

        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(true);
        expect(wrapper.find(UnfollowModal).find(Button).at(1).text().includes("Unfollow")).toBe(true);

        wrapper.find(UnfollowModal).find(Button).at(1).simulate("click");

        expect(mockDispatchFn).nthCalledWith(2, {
            payload: { userId: 1 },
            type: UserActionsType.UNFOLLOW_USER
        });
    });

    it("should open unfollow modal and unfollow participant private profile", () => {
        const mockUserProfileStore = {
            ...mockStore,
            userProfile: { ...mockStore.userProfile, user: { ...mockUserProfile, isPrivateProfile: true } }
        };
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, mockUserProfileStore);

        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(false);

        wrapper.find(Button).simulate("click");

        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(true);
        expect(wrapper.find(UnfollowModal).find(Button).at(1).text().includes("Unfollow")).toBe(true);

        wrapper.find(UnfollowModal).find(Button).at(1).simulate("click");

        expect(mockDispatchFn).nthCalledWith(2, {
            payload: 1,
            type: UserActionsType.PROCESS_FOLLOW_REQUEST
        });
    });

    it("should open unfollow modal and close", () => {
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, mockUserProfileStore);

        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(false);

        wrapper.find(Button).simulate("click");

        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(true);
        expect(wrapper.find(UnfollowModal).find(Button).at(0).text().includes("Cancel")).toBe(true);

        wrapper.find(UnfollowModal).find(Button).at(0).simulate("click");

        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(false);
    });

    it("should open leave conversation modal and leave", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<ConversationInfo participantId={1}
                                                         chatId={1} />, mockUserProfileStore, history);

        expect(wrapper.find("#leaveFromConversation").text().includes("Leave conversation")).toBe(true);
        expect(wrapper.find(LeaveFromConversationModal).prop("visible")).toBe(false);

        wrapper.find("#leaveFromConversation").simulate("click");

        expect(wrapper.find(LeaveFromConversationModal).prop("visible")).toBe(true);
        expect(wrapper.find(LeaveFromConversationModal).find(Button).at(0).text().includes("Leave")).toBe(true);

        wrapper.find(LeaveFromConversationModal).find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(2, {
            payload: { participantId: 1, chatId: 1 },
            type: ChatsActionsType.LEAVE_FROM_CONVERSATION
        });
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith({ pathname: MESSAGES, state: { removeParticipant: true } });
    });

    it("should open leave conversation modal and close", () => {
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, mockUserProfileStore);

        expect(wrapper.find("#leaveFromConversation").text().includes("Leave conversation")).toBe(true);
        expect(wrapper.find(LeaveFromConversationModal).prop("visible")).toBe(false);

        wrapper.find("#leaveFromConversation").simulate("click");

        expect(wrapper.find(LeaveFromConversationModal).prop("visible")).toBe(true);
        expect(wrapper.find(LeaveFromConversationModal).find(Button).at(1).text().includes("Cancel")).toBe(true);

        wrapper.find(LeaveFromConversationModal).find(Button).at(1).simulate("click");

        expect(wrapper.find(LeaveFromConversationModal).prop("visible")).toBe(false);
    });

    it("should click follow participant", () => {
        const mockUserProfileStore = {
            ...mockStore,
            userProfile: { ...mockStore.userProfile, user: { ...mockUserProfile, isFollower: false } }
        };
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, mockUserProfileStore);

        expect(wrapper.find(Button).text().includes("Follow")).toBe(true);

        wrapper.find(Button).simulate("click");

        expect(mockDispatchFn).nthCalledWith(2, {
            payload: { userId: 1 },
            type: UserActionsType.FOLLOW_USER
        });
    });

    it("should click process follow private profile", () => {
        const mockUserProfileStore = {
            ...mockStore,
            userProfile: {
                ...mockStore.userProfile,
                user: { ...mockUserProfile, isPrivateProfile: true, isFollower: false }
            }
        };
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, mockUserProfileStore);

        expect(wrapper.find(Button).text().includes("Follow")).toBe(true);

        wrapper.find(Button).simulate("click");

        expect(mockDispatchFn).nthCalledWith(2, {
            payload: 1,
            type: UserActionsType.PROCESS_FOLLOW_REQUEST
        });
    });

    it("should unmount ConversationInfo", () => {
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, mockUserProfileStore);

        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(2, { type: UserProfileActionsType.RESET_USER_PROFILE_STATE });
    });

    it("should hover block button", () => {
        const mockUserProfileStore = {
            ...mockStore,
            userProfile: {
                ...mockStore.userProfile,
                user: { ...mockUserProfile, isFollower: false, isUserBlocked: true }
            }
        };
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, mockUserProfileStore);

        expect(wrapper.find(Button).text().includes("Blocked")).toBe(true);

        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unblock")).toBe(true);

        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Blocked")).toBe(true);

        wrapper.find(Button).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
    });

    it("should hover approve button", () => {
        const mockUserProfileStore = {
            ...mockStore,
            userProfile: {
                ...mockStore.userProfile,
                user: { ...mockUserProfile, isFollower: false, isWaitingForApprove: true }
            }
        };
        const wrapper = mountWithStore(<ConversationInfo participantId={1} chatId={1} />, mockUserProfileStore);

        expect(wrapper.find(Button).text().includes("Pending")).toBe(true);

        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Cancel")).toBe(true);

        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Pending")).toBe(true);

        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: 1,
            type: UserActionsType.PROCESS_FOLLOW_REQUEST
        });
    });
});
