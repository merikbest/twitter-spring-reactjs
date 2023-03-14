import React from "react";
import { Avatar } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import ListInfoDescription from "../ListInfoDescription";
import { mockLists } from "../../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../../types/common";
import PopperListWindow from "../../../PopperListWindow/PopperListWindow";
import LockIcon from "../../../../../components/LockIcon/LockIcon";
import { DEFAULT_PROFILE_IMG } from "../../../../../constants/url-constants";

describe("ListInfoDescription", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockList = mockLists[0];

    it("should render ListInfoDescription", () => {
        const wrapper = mountWithStore(
            <ListInfoDescription
                listId={mockList.id}
                listName={mockList.name}
                listDescription={mockList.description}
                listIsPrivate={false}
                listOwnerFullName={mockList.listOwner.fullName}
                listOwnerUsername={mockList.listOwner.username}
                listOwnerAvatar={mockList.listOwner.avatar}
            />, mockStore);
        expect(wrapper.text().includes(mockList.name)).toBe(true);
        expect(wrapper.text().includes(mockList.description)).toBe(true);
        expect(wrapper.text().includes(mockList.listOwner.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockList.listOwner.username}`)).toBe(true);
    });

    it("should hover ListInfoDescription", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(
            <ListInfoDescription
                listId={mockList.id}
                listName={mockList.name}
                listDescription={mockList.description}
                listIsPrivate={true}
                listOwnerFullName={mockList.listOwner.fullName}
                listOwnerUsername={mockList.listOwner.username}
            />, mockStore);
        expect(wrapper.find(LockIcon).exists()).toBeTruthy();
        expect(wrapper.find(Avatar).prop("src")).toBe(DEFAULT_PROFILE_IMG);
        expect(wrapper.find(PopperListWindow).at(0).prop("visible")).toBe(false);
        wrapper.find("#listInfoWrapper").at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(PopperListWindow).exists()).toBeTruthy();
        expect(wrapper.find(PopperListWindow).at(0).prop("visible")).toBe(true);
    });
});
