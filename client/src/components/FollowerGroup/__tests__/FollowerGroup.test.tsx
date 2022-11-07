import React from "react";
import {Link} from "react-router-dom";
import {createMemoryHistory} from "history";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {mockMyProfile, mockSameFollowers, mockUserProfile} from "../../../util/mockData/mockData";
import {USER_FOLLOWERS_YOU_FOLLOW} from "../../../util/pathConstants";
import FollowerGroup from "../FollowerGroup";
import {LoadingStatus} from "../../../store/types/common";

describe("FollowerGroup", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render 2 Followers", () => {
        const wrapper = mountWithStore(<FollowerGroup user={mockUserProfile} sameFollowers={mockSameFollowers} />, mockRootState);
        
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(mockSameFollowers[0].avatar.src);
        expect(wrapper.find(Avatar).at(1).prop("src")).toBe(mockSameFollowers[1].avatar.src);
        expect(wrapper.text().includes("Followed by Random, Random11")).toBe(true);
    });

    it("should render 3 Followers", () => {
        const mockFollowers = [...mockSameFollowers, {
            "id": 12,
            "fullName": "Random11",
            "username": "Random11",
            "avatar": {
                "id": 11,
                "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
            }
        }];
        const wrapper = mountWithStore(<FollowerGroup user={mockUserProfile} sameFollowers={mockFollowers} />, mockRootState);

        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(mockFollowers[0].avatar.src);
        expect(wrapper.find(Avatar).at(1).prop("src")).toBe(mockFollowers[1].avatar.src);
        expect(wrapper.find(Avatar).at(2).prop("src")).toBe(mockFollowers[2].avatar.src);
        expect(wrapper.text().includes("Followed by Random, Random11 and 1 others you follow")).toBe(true);
    });

    it("should render empty Followers", () => {
        const wrapper = mountWithStore(<FollowerGroup user={mockUserProfile} sameFollowers={[]} />, mockRootState);
        
        expect(wrapper.text().includes("Not followed by anyone you’re following")).toBe(true);
    });

    it("should render empty FollowerGroup", () => {
        const wrapper = mountWithStore(<FollowerGroup user={mockMyProfile} sameFollowers={[]} />, mockRootState);
        
        expect(wrapper.find(Link).exists()).toBeFalsy();
    });

    it("should redirect to Same followers page", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<FollowerGroup user={mockUserProfile} sameFollowers={mockSameFollowers} />, mockRootState, history);
        
        wrapper.find(Link).at(0).simulate("click", {button: 0});
        
        expect(wrapper.find(Link).prop("to")).toBe(`${USER_FOLLOWERS_YOU_FOLLOW}/${mockUserProfile.id}`);
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${USER_FOLLOWERS_YOU_FOLLOW}/${mockUserProfile.id}`);
    });
});
