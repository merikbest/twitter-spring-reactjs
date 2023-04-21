import React from "react";
import { Button, Dialog, ListItem } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import MessagesModal from "../MessagesModal";
import MessagesModalUser from "../MessagesModalUser/MessagesModalUser";
import { UsersSearchActionsType } from "../../../../store/ducks/usersSearch/contracts/actionTypes";
import { ModalInputWrapper } from "../../../../components/ModalInput/ModalInputWrapper";
import { ChatsActionsType } from "../../../../store/ducks/chats/contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

describe("MessagesModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty MessagesModal window correctly", () => {
        const wrapper = mountWithStore(<MessagesModal visible={false} onClose={jest.fn()} />, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should render MessagesModal window correctly", () => {
        const wrapper = mountWithStore(<MessagesModal visible={true} onClose={jest.fn()} />, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.text().includes("New message")).toBe(true);
        expect(wrapper.find(Button).text().includes("Next")).toBe(true);
        expect(wrapper.find(MessagesModalUser).length).toEqual(2);
    });

    it("should change and submit MessagesModalInput", () => {
        const wrapper = mountWithStore(<MessagesModal visible={true} onClose={jest.fn()} />, mockStore);
        const input = wrapper.find(ModalInputWrapper).find("input").at(0);

        input.simulate("change", { target: { value: "test" } });

        expect(mockDispatchFn).nthCalledWith(1, {
            type: UsersSearchActionsType.RESET_USERS_STATE
        });

        expect(mockDispatchFn).nthCalledWith(2, {
            payload: { username: "test", pageNumber: 0 },
            type: UsersSearchActionsType.FETCH_USERS_BY_NAME
        });

        input.simulate("change", { target: { value: "" } });
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: [],
            type: UsersSearchActionsType.SET_USERS
        });

        input.simulate("submit");
        expect(mockDispatchFn).nthCalledWith(4, {
            payload: { username: "", pageNumber: 0 },
            type: UsersSearchActionsType.FETCH_USERS_BY_NAME
        });
    });

    it("should click on user and add to chat", () => {
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(<MessagesModal visible={true} onClose={mockOnClose} />, mockStore);
        const mockListItem = wrapper.find(ListItem).at(0);

        mockListItem.simulate("click");
        expect(wrapper.find(ListItem).at(0).prop("selected")).toBe(true);

        mockListItem.simulate("click");
        expect(wrapper.find(ListItem).at(0).prop("selected")).toBe(false);

        mockListItem.simulate("click");
        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: 4,
            type: ChatsActionsType.CREATE_CHAT
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: [],
            type: UsersSearchActionsType.SET_USERS
        });
        expect(mockOnClose).toHaveBeenCalled();
    });

    it("should scroll list of Users by input text", () => {
        const mockUserSearchStore = { ...mockStore, usersSearch: { ...mockStore.usersSearch, pagesCount: 10 } };
        const wrapper = mountWithStore(<MessagesModal visible={true} onClose={jest.fn()} />, mockUserSearchStore);
        const input = wrapper.find(ModalInputWrapper).find("input").at(0);
        input.simulate("change", { target: { value: "test" } });
        wrapper.find(InfiniteScroll).prop("next")();

        expect(wrapper.find(MessagesModalUser).length).toEqual(2);
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: { username: "test", pageNumber: 1 },
            type: UsersSearchActionsType.FETCH_USERS_BY_NAME
        });
    });
});
