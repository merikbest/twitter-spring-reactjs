import React from "react";
import { Avatar, Button, Dialog } from "@material-ui/core";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { setImmediate } from "timers";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import EditProfileModal from "../EditProfileModal";
import { mockFullTweet, mockUser } from "../../../../../util/test-utils/mock-test-data";
import TweetInput from "../../../../../components/TweetInput/TweetInput";
import { API_USER_UPLOAD_IMAGE } from "../../../../../constants/endpoint-constants";
import { UserActionsType } from "../../../../../store/ducks/user/contracts/actionTypes";
import { LoadingStatus } from "../../../../../types/common";

describe("EditProfileModal", () => {
    const mock = new MockAdapter(axios);
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly Edit Profile Modal", () => {
        const wrapper = mountWithStore(<EditProfileModal visible={true} onClose={jest.fn()} />, mockRootState);

        expect(wrapper.text().includes("Edit Profile")).toBe(true);
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockUser.wallpaper);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar);
        expect(wrapper.find(TweetInput).at(0).prop("value")).toBe(mockUser.fullName);
        expect(wrapper.find(TweetInput).at(1).prop("value")).toBe(mockUser.about);
        expect(wrapper.find(TweetInput).at(2).prop("value")).toBe(mockUser.location);
        expect(wrapper.find(TweetInput).at(3).prop("value")).toBe(mockUser.website);
    });

    it("should submit Edit Profile Modal form", (done) => {
        const wrapper = mountWithStore(<EditProfileModal visible={true} onClose={jest.fn()} />, mockRootState);
        mock.onPost(API_USER_UPLOAD_IMAGE).reply(200, mockFullTweet.images[0]);
        mock.onPost(API_USER_UPLOAD_IMAGE).reply(200, mockFullTweet.images[0]);

        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    fullName: mockUser.fullName,
                    location: mockUser.location,
                    website: mockUser.website,
                    avatar: undefined,
                    wallpaper: undefined,
                    about: mockUser.about
                }, type: UserActionsType.UPDATE_USER_DATA
            });
        });
    });

    it("should render empty Edit Profile Modal", () => {
        const wrapper = mountWithStore(<EditProfileModal visible={false} onClose={jest.fn()} />, mockRootState);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
