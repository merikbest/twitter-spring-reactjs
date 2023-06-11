import React from "react";
import { Button, Chip, Dialog } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import CloseIcon from "@material-ui/icons/Close";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../types/common";
import TagPeopleModal from "../TagPeopleModal";
import UserChip from "../../../../../UserChip/UserChip";
import TagPeopleItem from "../TagPeopleItem/TagPeopleItem";
import { mockUsers } from "../../../../../../util/test-utils/mock-test-data";
import { ModalInputWrapper } from "../../../../../ModalInput/ModalInputWrapper";
import { UsersSearchActionsType } from "../../../../../../store/ducks/usersSearch/contracts/actionTypes";
import { UserResponse } from "../../../../../../types/user";
import { AddTweetFormTypes } from "../../../../../../store/ducks/addTweetForm/constants/actionTypes";

describe("TagPeopleModal", () => {
    const mockText = "mock_text";
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = createTagPeopleModalWrapper();
        expect(wrapper.find(Button).prop("disabled")).toBe(true);
        expect(wrapper.find(UserChip).length).toEqual(0);
        expect(wrapper.find(TagPeopleItem).length).toEqual(2);
    });

    it("should render selected users", () => {
        const wrapper = createTagPeopleModalWrapper(mockUsers);
        expect(wrapper.find(UserChip).length).toEqual(2);
    });

    it("should on click delete user", () => {
        const wrapper = createTagPeopleModalWrapper(mockUsers);
        expect(wrapper.find(UserChip).length).toEqual(2);
        wrapper.find(Chip).at(0).find(CloseIcon).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: mockUsers[0],
            type: AddTweetFormTypes.REMOVE_SELECTED_USER
        });
    });

    it("should search users by text and clear input", () => {
        const wrapper = createTagPeopleModalWrapper();
        wrapper.find(ModalInputWrapper).find("input").at(0).simulate("change", { target: { value: mockText } });
        expect(mockDispatchFn).nthCalledWith(1, { type: UsersSearchActionsType.RESET_USERS_STATE });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: { pageNumber: 0, username: mockText },
            type: UsersSearchActionsType.FETCH_USERS_BY_NAME
        });
        wrapper.find(ModalInputWrapper).find("input").at(0).simulate("change", { target: { value: "" } });
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: [],
            type: UsersSearchActionsType.SET_USERS
        });
    });

    it("should scroll list of Users", () => {
        const mockStore = createMockRootState(LoadingStatus.LOADED);
        const mockRootState = { ...mockStore, usersSearch: { ...mockStore.usersSearch, pagesCount: 10 } };
        const wrapper = mountWithStore(<TagPeopleModal visible={true} onClose={jest.fn()} />, mockRootState);
        wrapper.find(ModalInputWrapper).find("input").at(0).simulate("change", { target: { value: mockText } });
        wrapper.find(InfiniteScroll).prop("next")();
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { username: mockText, pageNumber: 1 },
            type: UsersSearchActionsType.FETCH_USERS_BY_NAME
        });
    });

    it("should render empty TagPeopleModal", () => {
        const wrapper = mountWithStore(<TagPeopleModal visible={false} onClose={jest.fn()} />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    const createTagPeopleModalWrapper = (selectedUsers: UserResponse[] = [], visible = true) => {
        const mockStore = createMockRootState(LoadingStatus.LOADED);
        const mockRootState = {
            ...mockStore,
            addTweetForm: { ...mockStore.addTweetForm, selectedUsers: selectedUsers }
        };
        return mountWithStore(<TagPeopleModal visible={visible} onClose={jest.fn()} />, mockRootState);
    };
});
