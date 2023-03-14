import React from "react";
import { Checkbox } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { mockFullTweet } from "../../../../../util/test-utils/mock-test-data";
import UnsentTweetItem from "../UnsentTweetItem";
import { LoadingStatus } from "../../../../../types/common";

describe("UnsentTweetItem", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    const mockTweet = { ...mockFullTweet, scheduledDate: "2022-10-15T21:20:33" };

    it("should click open Edit Tweet Modal", () => {
        const mockOnOpenEditTweetModal = jest.fn();

        const wrapper = mountWithStore(
            <UnsentTweetItem
                tweet={mockTweet}
                onOpenEditTweetModal={mockOnOpenEditTweetModal}
                onToggleCheckTweet={jest.fn()}
                isTweetSelected
                visibleEditListFooter
            />, mockRootState);

        wrapper.find("div").at(0).simulate("click");
        expect(wrapper.find(Checkbox).at(0).prop("value")).toBe(9);
        expect(wrapper.text().includes("Will send on Sat, Oct 15, 2022 at 09:20 PM")).toBe(true);
        expect(wrapper.text().includes(mockTweet.text)).toBe(true);
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockTweet.images[0].src);
        expect(mockOnOpenEditTweetModal).toHaveBeenCalled();
        expect(mockOnOpenEditTweetModal).toHaveBeenCalledWith(mockTweet);
    });

    it("should toggle Check Box", () => {
        const mockOnToggleCheckTweet = jest.fn();

        const wrapper = mountWithStore(
            <UnsentTweetItem
                tweet={mockTweet}
                onOpenEditTweetModal={jest.fn()}
                onToggleCheckTweet={mockOnToggleCheckTweet}
                isTweetSelected
                visibleEditListFooter
            />, mockRootState);

        wrapper.find(Checkbox).simulate("click");

        expect(mockOnToggleCheckTweet).toHaveBeenCalled();
        expect(mockOnToggleCheckTweet).toHaveBeenCalledWith(mockTweet.id);
    });
});
