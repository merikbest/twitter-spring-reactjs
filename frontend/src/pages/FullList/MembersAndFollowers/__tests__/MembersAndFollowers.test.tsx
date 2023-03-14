import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockFullList } from "../../../../util/test-utils/mock-test-data";
import MembersAndFollowers from "../MembersAndFollowers";
import MembersAndFollowersModal from "../../FullListTweets/MembersAndFollowersModal/MembersAndFollowersModal";
import CloseButton from "../../../../components/CloseButton/CloseButton";

describe("MembersAndFollowers", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should open/close Members Modal Window", () => {
        testOpenAndCloseModalWindow("#listMembers", "List members");
    });

    it("should open/close Followers Modal Window", () => {
        testOpenAndCloseModalWindow("#listFollowers", "List followers");
    });

    const testOpenAndCloseModalWindow = (itemId: string, modalTitle: string) => {
        const mockState = { ...mockRootState, list: { ...mockRootState.list, list: mockFullList } };
        const wrapper = mountWithStore(<MembersAndFollowers />, mockState);
        expect(wrapper.find(MembersAndFollowersModal).prop("visible")).toBe(false);
        wrapper.find(itemId).at(0).simulate("click");
        expect(wrapper.find(MembersAndFollowersModal).prop("visible")).toBe(true);
        expect(wrapper.find(MembersAndFollowersModal).prop("title")).toBe(modalTitle);
        wrapper.find(MembersAndFollowersModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(MembersAndFollowersModal).prop("visible")).toBe(false);
    };
});
