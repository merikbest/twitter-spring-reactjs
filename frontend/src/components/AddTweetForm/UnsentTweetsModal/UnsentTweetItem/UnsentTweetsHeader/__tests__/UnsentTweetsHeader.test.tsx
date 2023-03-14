import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../types/common";
import UnsentTweetsHeader from "../UnsentTweetsHeader";

describe("UnsentTweetsHeader", () => {

    it("should click Unsent Tweets button", () => {
        const mockOnCloseEditTweetModal = jest.fn();
        const wrapper = mountWithStore(
            <UnsentTweetsHeader
                visibleEditTweetModal
                visibleEditListFooter
                onCloseEditTweetList={jest.fn()}
                onOpenEditTweetList={jest.fn()}
                onCloseEditTweetModal={mockOnCloseEditTweetModal}
                onClose={jest.fn()}
            />, createMockRootState(LoadingStatus.LOADED));
        wrapper.find(Button).simulate("click");
        expect(wrapper.text().includes("Unsent Tweets")).toBe(true);
        expect(mockOnCloseEditTweetModal).toHaveBeenCalled();
    });

    it("should click Done button", () => {
        const onCloseEditTweetList = jest.fn();
        const wrapper = mountWithStore(
            <UnsentTweetsHeader
                visibleEditTweetModal={false}
                visibleEditListFooter
                onCloseEditTweetList={onCloseEditTweetList}
                onOpenEditTweetList={jest.fn()}
                onCloseEditTweetModal={jest.fn()}
                onClose={jest.fn()}
            />, createMockRootState(LoadingStatus.LOADED));
        wrapper.find(Button).simulate("click");
        expect(wrapper.text().includes("Unsent Tweets")).toBe(true);
        expect(wrapper.text().includes("Done")).toBe(true);
        expect(onCloseEditTweetList).toHaveBeenCalled();
    });

    it("should click Edit button", () => {
        const mockOnOpenEditTweetList = jest.fn();
        const wrapper = mountWithStore(
            <UnsentTweetsHeader
                visibleEditTweetModal={false}
                visibleEditListFooter={false}
                onCloseEditTweetList={jest.fn()}
                onOpenEditTweetList={mockOnOpenEditTweetList}
                onCloseEditTweetModal={jest.fn()}
                onClose={jest.fn()}
            />, createMockRootState(LoadingStatus.LOADED));
        wrapper.find(Button).simulate("click");
        expect(wrapper.text().includes("Edit")).toBe(true);
        expect(mockOnOpenEditTweetList).toHaveBeenCalled();
    });
});
