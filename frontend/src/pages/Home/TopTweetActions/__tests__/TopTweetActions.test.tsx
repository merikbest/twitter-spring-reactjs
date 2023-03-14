import React from "react";
import { ClickAwayListener, IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import TopTweetActions from "../TopTweetActions";
import HoverAction from "../../../../components/HoverAction/HoverAction";
import { LoadingStatus } from "../../../../types/common";

describe("TopTweetActions", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    beforeEach(() => {
        React.useState = jest.fn().mockReturnValue([true, jest.fn()]);
    });

    it("should render Latest Tweets info", () => {
        const wrapper = mountWithStore(
            <TopTweetActions
                switchTweets={true}
                handleLatestTweets={jest.fn()}
                handleTopTweets={jest.fn()}
            />, mockStore);

        expect(wrapper.text().includes("Latest Tweets show up as they happen")).toBe(true);
        expect(wrapper.text().includes("Go back Home")).toBe(true);
        expect(wrapper.text().includes("You’ll see top Tweets first.")).toBe(true);
        expect(wrapper.text().includes("View content preferences")).toBe(true);
    });

    it("should render Top Tweets info", () => {
        const wrapper = mountWithStore(
            <TopTweetActions
                switchTweets={false}
                handleLatestTweets={jest.fn()}
                handleTopTweets={jest.fn()}
            />, mockStore);

        expect(wrapper.text().includes("Home shows you top Tweets first")).toBe(true);
        expect(wrapper.text().includes("See latest Tweets instead")).toBe(true);
        expect(wrapper.text().includes("You’ll see Tweets show up as they happen.")).toBe(true);
    });

    it("should click Top Tweet Actions", () => {
        const wrapper = mountWithStore(
            <TopTweetActions
                switchTweets={true}
                handleLatestTweets={jest.fn()}
                handleTopTweets={jest.fn()}
            />, mockStore);
        wrapper.find(IconButton).simulate("click");

        expect(wrapper.find(TopTweetActions).exists()).toBe(true);
    });

    it("should click Away", () => {
        const wrapper = mountWithStore(
            <TopTweetActions
                switchTweets={true}
                handleLatestTweets={jest.fn()}
                handleTopTweets={jest.fn()}
            />, mockStore);
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());

        expect(wrapper.find(TopTweetActions).exists()).toBe(true);
    });

    it("should hover Top Tweets icon and render Hover Action", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<TopTweetActions
            switchTweets={true}
            handleLatestTweets={jest.fn()}
            handleTopTweets={jest.fn()}
        />, mockStore);
        wrapper.find(IconButton).at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(0).prop("actionText")).toBe("Top Tweets");
    });
});
