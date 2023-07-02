import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import { mockUserFullList } from "../../../../../util/test-utils/mock-test-data";
import PopperListInteractionCount from "../PopperListInteractionCount";
import MembersAndFollowersModal
    from "../../../../FullList/FullListTweets/MembersAndFollowersModal/MembersAndFollowersModal";
import CloseButton from "../../../../../components/CloseButton/CloseButton";

describe("PopperListInteractionCount", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListDetail = { ...mockStore, listDetail: { ...mockStore.listDetail, item: mockUserFullList } };

    it("should open/close members modal", () => {
        testModal("#openMembersModalWindow", "List members");
    });

    it("should open.close followers modal", () => {
        testModal("#openFollowersModalWindow", "List followers");
    });

    const testModal = (itemId: string, title: string): void => {
        const wrapper = mountWithStore(<PopperListInteractionCount />, mockListDetail);
        expect(wrapper.find(MembersAndFollowersModal).prop("visible")).toBe(false);
        wrapper.find(itemId).at(0).simulate("click");
        expect(wrapper.find(MembersAndFollowersModal).prop("title")).toBe(title);
        expect(wrapper.find(MembersAndFollowersModal).prop("visible")).toBe(true);
        wrapper.find(MembersAndFollowersModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(MembersAndFollowersModal).prop("visible")).toBe(false);
    };
});
