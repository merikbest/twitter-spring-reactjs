import React from "react";
import {Link} from "react-router-dom";
import {Skeleton} from "@material-ui/lab";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import UserInteractionCount from "../UserInteractionCount";
import UserFollowersCount from "../UserFollowersCount/UserFollowersCount";
import UserFollowingCount from "../UserFollowingCount/UserFollowingCount";
import {mockUser} from "../../../../util/mockData/mockData";

describe("UserInteractionCount", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserInteractionCount/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(UserFollowersCount).exists()).toBeTruthy();
        expect(wrapper.find(UserFollowingCount).exists()).toBeTruthy();
    });

    it("should render loading", () => {
        const wrapper = mountWithStore(<UserInteractionCount/>, {
            ...mockStore,
            userProfile: {
                ...mockStore.userProfile,
                user: {...mockUser, id: undefined}}
        });
        expect(wrapper.find(Skeleton).at(0).exists()).toBeTruthy();
        expect(wrapper.find(Skeleton).at(1).exists()).toBeTruthy();
    });

    it("should render private LinkToFollowers", () => {
        const wrapper = mountWithStore(<UserInteractionCount/>, {
            ...mockStore,
            userProfile: {
                ...mockStore.userProfile,
                user: {...mockUser, id: 11, isPrivateProfile: true}}
        });
        expect(wrapper.find(Link).at(0).exists()).toBeFalsy();
        expect(wrapper.find(Link).at(1).exists()).toBeFalsy();
    });
});
