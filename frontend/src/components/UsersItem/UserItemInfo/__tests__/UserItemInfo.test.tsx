import React from "react";
import {Typography} from "@material-ui/core";

import {mountWithStore} from "../../../../util/testHelper";
import {mockUsers} from "../../../../util/mockData/mockData";
import {UserItemSize} from "../../UsersItem";
import UserItemInfo from "../UserItemInfo";
import LockIcon from "../../../LockIcon/LockIcon";

describe("UserItemInfo", () => {
    const mockUser = mockUsers[0];

    it("should render correctly", () => {
        const wrapper = getUserItemInfoWrapper(false, false);
        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockUser.username)).toBe(true);
        expect(wrapper.text().includes(mockUser.about)).toBe(true);
    });

    it("should render LockIcon", () => {
        const wrapper = getUserItemInfoWrapper(true, true);
        expect(wrapper.find(LockIcon).exists()).toBeTruthy();
    });

    it("should not render user description", () => {
        const wrapper = getUserItemInfoWrapper(true, false, UserItemSize.SMALL);
        expect(wrapper.find(Typography).at(2).exists()).toBeFalsy();
    });

    const getUserItemInfoWrapper = (isPrivateProfile: boolean, isMyProfileBlocked: boolean, size = UserItemSize.LARGE) => {
        return mountWithStore(
            <UserItemInfo
                fullName={mockUser.fullName}
                username={mockUser.username}
                about={mockUser.about}
                isPrivateProfile={isPrivateProfile}
                isMyProfileBlocked={isMyProfileBlocked}
                size={size}
            />);
    }
});
