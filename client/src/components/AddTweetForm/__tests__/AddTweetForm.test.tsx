import React from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, IconButton, TextareaAutosize} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import AddTweetForm from "../AddTweetForm";
import {LoadingStatus} from "../../../store/types";
import {mockFullTweet, mockUser} from "../../../util/mockData/mockData";
import {PROFILE} from "../../../util/pathConstants";
import HoverAction from "../../HoverAction/HoverAction";
import {TweetsActionType} from "../../../store/ducks/tweets/contracts/actionTypes";
import {ReplyType} from "../../../store/ducks/tweets/contracts/state";
import ScheduleModal from "../ScheduleModal/ScheduleModal";

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
