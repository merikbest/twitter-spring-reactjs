import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockUser} from "../../../../util/mockData/mockData";
import {Skeleton} from "@material-ui/lab";
import React from "react";
import UserInfo from "../UserInfo";

describe("UserInfo", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserInfo/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockUser.username)).toBe(true);
        expect(wrapper.text().includes(mockUser.about)).toBe(true);
    });

    it("should render loading", () => {
        const wrapper = mountWithStore(<UserInfo/>, {
            ...mockStore,
            userProfile: {
                ...mockStore.userProfile,
                user: {...mockUser, id: undefined}}
        });
        expect(wrapper.find(Skeleton).at(0).exists()).toBeTruthy();
        expect(wrapper.find(Skeleton).at(1).exists()).toBeTruthy();
    });
});
