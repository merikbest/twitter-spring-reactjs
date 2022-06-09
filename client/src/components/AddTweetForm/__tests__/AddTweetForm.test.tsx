import React from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, IconButton, Popover, TextareaAutosize} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import AddTweetForm from "../AddTweetForm";
import {LoadingStatus} from "../../../store/types";
import {mockFullTweet, mockQuoteTweet, mockUser} from "../../../util/mockData/mockData";
import {PROFILE} from "../../../util/pathConstants";
import HoverAction from "../../HoverAction/HoverAction";
import {TweetsActionType} from "../../../store/ducks/tweets/contracts/actionTypes";
import {ReplyType} from "../../../store/ducks/tweets/contracts/state";
import ScheduleModal from "../ScheduleModal/ScheduleModal";
import Poll from "../Poll/Poll";
import PollInput from "../Poll/PollInput/PollInput";

describe("AddTweetForm", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"} buttonName={"Tweet"}/>, mockRootState);

        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar.src);
        expect(wrapper.find(Link).prop("to")).toBe(`${PROFILE}/${mockUser.id}`);
        expect(wrapper.find(TextareaAutosize).prop("placeholder")).toBe("What's happening?");
        expect(wrapper.find(Button).at(1).text()).toEqual("Tweet");
    });

    it("should render Unsent Tweet correctly and update", (done) => {
        const mockTweet = {...mockFullTweet, images: [], scheduledDate: "2022-10-15T21:20:33"};
        const wrapper = mountWithStore(
            <AddTweetForm
                unsentTweet={mockTweet}
                title={"What's happening?"}
                buttonName={"Tweet"}
            />, mockRootState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe(mockFullTweet.text);
        expect(wrapper.find("#tweetScheduleDate").text()).toBe("Will send on Sat, Oct 15, 2022 at 09:20 PM");
        expect(wrapper.find("#textCount").text()).toBe("269");
        expect(wrapper.find(IconButton).at(2).prop("disabled")).toBe(true);
        expect(wrapper.find(HoverAction).at(2).prop("actionText")).toBe("Poll");

        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    id: mockFullTweet.id,
                    text: mockFullTweet.text,
                    images: [],
                    replyType: ReplyType.EVERYONE,
                }, type: TweetsActionType.UPDATE_SCHEDULED_TWEET
            });
        });
    });
    
    it("should add Tweet", (done) => {
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"} buttonName={"Tweet"}/>, mockRootState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(Popover).at(1).prop("open")).toBe(false);

        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", {target: {value: "test"}});

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("test");

        wrapper.find("#onClickAddEmoji").simulate("click");

        expect(wrapper.find(Popover).at(1).prop("open")).toBe(true);

        wrapper.find(".emoji-mart-category-list").at(1).find("li").at(0).find("button").simulate("click");
        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    text: "test :+1:",
                    images: [],
                    replyType: ReplyType.EVERYONE,
                }, type: TweetsActionType.ADD_TWEET
            });
        });
    });

    it("should add Scheduled Tweet", (done) => {
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"} buttonName={"Tweet"}/>, mockRootState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(ScheduleModal).exists()).toBeFalsy();

        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", {target: {value: "test"}});

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("test");

        wrapper.find(IconButton).at(4).simulate("click");

        expect(wrapper.find(ScheduleModal).exists()).toBeTruthy();

        wrapper.find(ScheduleModal).find(Button).at(0).simulate("click");
        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).toHaveBeenCalled();
        });
    });

    it("should add Tweet with Poll", (done) => {
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"} buttonName={"Tweet"}/>, mockRootState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(Poll).prop("visiblePoll")).toBe(false);

        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", {target: {value: "test"}});

        wrapper.find(IconButton).at(2).simulate("click");

        expect(wrapper.find(Poll).prop("visiblePoll")).toBe(true);

        wrapper.find(Poll).find(PollInput).at(0).find("input").at(0).simulate("change", {target: {value: "test poll 1"}});
        wrapper.find(Poll).find(PollInput).at(1).find("input").at(0).simulate("change", {target: {value: "test poll 2"}});
        
        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    text: "test",
                    images: [],
                    pollDateTime: 1440,
                    choices: ["test poll 1", "test poll 2"],
                    replyType: ReplyType.EVERYONE,
                }, type: TweetsActionType.ADD_POLL
            });
        });
    });

    it("should add Tweet with Quote", (done) => {
        const wrapper = mountWithStore(
            <AddTweetForm
                quoteTweet={mockQuoteTweet}
                title={"What's happening?"}
                buttonName={"Tweet"}
            />, mockRootState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(IconButton).at(2).prop("disabled")).toBe(true);
        expect(wrapper.find(IconButton).at(4).prop("disabled")).toBe(true);

        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", {target: {value: "test"}});
        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    text: "test",
                    images: [],
                    replyType: ReplyType.EVERYONE,
                    tweetId: 13,
                }, type: TweetsActionType.ADD_QUOTE_TWEET
            });
        });
    });
    // |   76.32 |    67.28 |   62.16 |   76.74 | 158-160,164,207-227,231-253,261,271,275,291,300-301,306-312,329,333-334,338-339,377
    it("should render tweet with image", () => {
        const wrapper = mountWithStore(
            <AddTweetForm
                unsentTweet={mockFullTweet}
                title={"What's happening?"}
                buttonName={"Tweet"}
            />, mockRootState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe(mockFullTweet.text);
        expect(wrapper.find("img").at(1).prop("src")).toBe(mockFullTweet.images[0].src);
    });

    it("should hover GIF icon and render Hover Action", () => {
        testHoverIcon(1, "GIF");
    });

    it("should hover Poll icon and render Hover Action", () => {
        testHoverIcon(2, "Poll");
    });

    it("should hover Emoji icon and render Hover Action", () => {
        testHoverIcon(3, "Emoji");
    });

    it("should hover Schedule icon and render Hover Action", () => {
        testHoverIcon(4, "Schedule");
    });

    const testHoverIcon = (itemIndex: number, actionText: string): void => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"} buttonName={"Tweet"}/>, mockRootState);
        wrapper.find(IconButton).at(itemIndex).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(itemIndex).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(itemIndex).prop("actionText")).toBe(actionText);
    };
});
