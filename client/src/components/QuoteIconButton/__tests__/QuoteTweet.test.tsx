import React from "react";
import {ClickAwayListener, IconButton} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import {mockFullTweet} from "../../../util/mockData/mockData";
import QuoteIconButton from "../QuoteIconButton";
import QuoteTweetModal from "../QuoteTweetModal/QuoteTweetModal";
import CloseButton from "../../CloseButton/CloseButton";

describe("QuoteTweet", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render is tweet retweeted by owner", () => {
        const {wrapper} = createQuoteTweetWrapper();

        expect(wrapper.find("#retweetIcon").exists()).toBeTruthy();
        expect(wrapper.find("#retweets").exists()).toBeFalsy();

        wrapper.find(IconButton).simulate("click");

        expect(wrapper.text().includes("Undo Retweet")).toBe(true);
        expect(wrapper.text().includes("Quote Tweet")).toBe(true);
        expect(wrapper.find("#retweetOutlinedIcon").exists()).toBeTruthy();
        expect(wrapper.find("#quoteTweetIcon").exists()).toBeTruthy();
    });

    it("should render is tweet retweeted by user", () => {
        const {wrapper} = createQuoteTweetWrapper(false, 10);

        expect(wrapper.find("#retweetOutlinedIcon").exists()).toBeTruthy();
        expect(wrapper.find("#retweets").text().includes("10")).toBe(true);

        wrapper.find(IconButton).simulate("click");

        expect(wrapper.text().includes("Retweet")).toBe(true);
    });

    it("should open and close QuoteTweetModal", () => {
        const {wrapper} = createQuoteTweetWrapper();

        expect(wrapper.find(QuoteTweetModal).prop("visible")).toBe(false);

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#clickOpenAddTweet").at(0).simulate("click");

        expect(wrapper.find(QuoteTweetModal).prop("visible")).toBe(true);

        wrapper.find(QuoteTweetModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(QuoteTweetModal).prop("visible")).toBe(false);
    });

    it("should click Retweet", () => {
        const {wrapper, mockHandleRetweet} = createQuoteTweetWrapper();

        wrapper.find(IconButton).simulate("click");
        wrapper.find("#clickRetweet").at(0).simulate("click");

        expect(mockHandleRetweet).toHaveBeenCalled();
    });

    it("should click away QuoteTweet", () => {
        const {wrapper} = createQuoteTweetWrapper();
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());

        expect(wrapper.find(ClickAwayListener).exists()).toBeTruthy();
    });

    const createQuoteTweetWrapper = (isTweetRetweetedByMe = true, retweetsCount = 0) => {
        const mockHandleRetweet = jest.fn();
        const wrapper = mountWithStore(<QuoteIconButton tweet={mockFullTweet}/>, mockRootState);

        return {wrapper, mockHandleRetweet}
    };
});
