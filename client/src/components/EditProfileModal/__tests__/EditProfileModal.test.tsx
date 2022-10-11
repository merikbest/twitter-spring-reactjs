import React from "react";
import {Avatar, Button, Dialog} from "@material-ui/core";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import EditProfileModal from "../EditProfileModal";
import {mockFullTweet, mockUser} from "../../../util/mockData/mockData";
import TweeterInput from "../TweetInput/TweeterInput";
import {API_USER_UPLOAD_IMAGE} from "../../../util/endpoints";
import {UserActionsType} from "../../../store/ducks/user/contracts/actionTypes";

describe("EditProfileModal", () => {
    const mock = new MockAdapter(axios);
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });
    
    it("should render correctly Edit Profile Modal", () => {
        const wrapper = mountWithStore(<EditProfileModal visible={true} onClose={jest.fn()}/>, mockRootState);
        
        expect(wrapper.text().includes("Edit Profile")).toBe(true);
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockUser.wallpaper.src);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar.src);
        expect(wrapper.find(TweeterInput).at(0).prop("value")).toBe(mockUser.username);
        expect(wrapper.find(TweeterInput).at(1).prop("value")).toBe(mockUser.about);
        expect(wrapper.find(TweeterInput).at(2).prop("value")).toBe(mockUser.location);
        expect(wrapper.find(TweeterInput).at(3).prop("value")).toBe(mockUser.website);
    });

    it("should submit Edit Profile Modal form", (done) => {
        const wrapper = mountWithStore(<EditProfileModal visible={true} onClose={jest.fn()}/>, mockRootState);
        mock.onPost(API_USER_UPLOAD_IMAGE).reply(200, mockFullTweet.images[0]);
        mock.onPost(API_USER_UPLOAD_IMAGE).reply(200, mockFullTweet.images[0]);
        
        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    username: mockUser.username,
                    location: mockUser.location,
                    website: mockUser.website,
                    avatar: undefined,
                    wallpaper: undefined,
                    about: mockUser.about,
                }, type: UserActionsType.UPDATE_USER_DATA
            });
        });
    });
    
    it("should render empty Edit Profile Modal", () => {
        const wrapper = mountWithStore(<EditProfileModal visible={false} onClose={jest.fn()}/>, mockRootState);
        
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
