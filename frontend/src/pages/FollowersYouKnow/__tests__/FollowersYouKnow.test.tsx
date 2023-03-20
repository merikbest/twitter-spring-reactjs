import React from "react";
import ReactRouter from "react-router";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import { setImmediate } from "timers";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import Spinner from "../../../components/Spinner/Spinner";
import FollowersYouKnow from "../FollowersYouKnow";
import { mockMyProfile, mockUserPrivateProfile, mockUsers } from "../../../util/test-utils/mock-test-data";
import { API_USER_FOLLOW_OVERALL } from "../../../constants/endpoint-constants";
import UsersItem from "../../../components/UsersItem/UsersItem";
import { UserProfileActionsType } from "../../../store/ducks/userProfile/contracts/actionTypes";
import { UserResponse } from "../../../types/user";
import { PROFILE, USER } from "../../../constants/path-constants";
import { LoadingStatus } from "../../../types/common";

describe("FollowersYouKnow", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockUserId = 1234;
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());

    const setupTest = (userId: number, mockUsers: UserResponse[]) => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: userId.toString() });
        const mock = new MockAdapter(axios);
        mock.onGet(`${API_USER_FOLLOW_OVERALL}/${userId}`).reply(200, mockUsers);
    };

    it("should fetch user profile and overall Followers list", (done) => {
        setupTest(mockUserId, mockUsers);
        const wrapper = mountWithStore(<FollowersYouKnow />, mockStore);

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.text().includes("Followers you know")).toBe(true);
            expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
            expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
            expect(wrapper.find(UsersItem).length).toEqual(2);
            expect(mockDispatchFn).toHaveBeenCalledWith({
                payload: mockUserId,
                type: UserProfileActionsType.FETCH_USER
            });
        });
    });

    it("should fetch user profile and overall Followers empty list", (done) => {
        setupTest(mockUserId, []);
        const wrapper = mountWithStore(<FollowersYouKnow />, mockStore);

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
            expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
            expect(wrapper.text().includes(`@${mockMyProfile.username} doesn’t have any followers you know yet`)).toBe(true);
            expect(wrapper.text().includes("When someone you know follows them, they’ll be listed here.")).toBe(true);
            expect(mockDispatchFn).toHaveBeenCalledWith({
                payload: mockUserId,
                type: UserProfileActionsType.FETCH_USER
            });
        });
    });

    it("should fetch user profile and redirect to followers page", (done) => {
        const mockUserId = 2;
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        setupTest(mockUserId, []);

        const wrapper = mountWithStore(<FollowersYouKnow />, mockStore, history);

        setImmediate(() => {
            wrapper.update();
            done();
            expect(pushSpy).toHaveBeenCalled();
            expect(pushSpy).toHaveBeenCalledWith(`${USER}/${mockUserId}/followers`);
            expect(mockDispatchFn).toHaveBeenCalledWith({
                payload: mockUserId,
                type: UserProfileActionsType.FETCH_USER
            });
        });
    });

    it("should fetch user profile and redirect to private page", (done) => {
        const mockUserId = 3;
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        setupTest(mockUserId, []);

        const store = { ...mockStore, userProfile: { ...mockStore.userProfile, user: mockUserPrivateProfile } };
        const wrapper = mountWithStore(<FollowersYouKnow />, store, history);

        setImmediate(() => {
            wrapper.update();
            done();
            expect(pushSpy).toHaveBeenCalled();
            expect(pushSpy).toHaveBeenCalledWith(`${PROFILE}/${mockUserId}`);
            expect(mockDispatchFn).toHaveBeenCalledWith({
                payload: mockUserId,
                type: UserProfileActionsType.FETCH_USER
            });
        });
    });

    it("should render loading Spinner", () => {
        setupTest(mockUserId, mockUsers);
        mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: mockUserId.toString() });
        const wrapper = mountWithStore(<FollowersYouKnow />, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });
});
