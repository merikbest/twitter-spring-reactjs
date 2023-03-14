import React from "react";
import { Dialog } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockQuoteTweet } from "../../../../util/test-utils/mock-test-data";
import QuoteTweetModal from "../QuoteTweetModal";
import CloseButton from "../../../CloseButton/CloseButton";
import AddTweetForm from "../../../AddTweetForm/AddTweetForm";
import { LoadingStatus } from "../../../../types/common";

describe("QuoteTweetModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <QuoteTweetModal
                quoteTweet={mockQuoteTweet}
                visible={true}
                onClose={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.find(CloseButton).exists()).toBeTruthy();
        expect(wrapper.find(AddTweetForm).exists()).toBeTruthy();
    });

    it("should render empty QuoteTweetModal", () => {
        const wrapper = mountWithStore(
            <QuoteTweetModal
                quoteTweet={mockQuoteTweet}
                visible={false}
                onClose={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
