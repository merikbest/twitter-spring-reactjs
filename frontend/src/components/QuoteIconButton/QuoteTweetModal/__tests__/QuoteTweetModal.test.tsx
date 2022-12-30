import React from "react";
import {Dialog} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {mockQuoteTweet} from "../../../../util/mockData/mockData";
import QuoteTweetModal from "../QuoteTweetModal";
import CloseButton from "../../../CloseButton/CloseButton";
import AddTweetForm from "../../../AddTweetForm/AddTweetForm";
import {LoadingStatus} from "../../../../store/types/common";

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
