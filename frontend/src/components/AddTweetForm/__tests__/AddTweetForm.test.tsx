import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Link } from "react-router-dom";
import { Avatar, Button, IconButton, Popover, TextareaAutosize } from "@material-ui/core";
import { createMemoryHistory } from "history";
import { setImmediate } from "timers";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import AddTweetForm from "../AddTweetForm";
import { mockFullTweet, mockMyProfile, mockQuoteTweet, mockUser } from "../../../util/test-utils/mock-test-data";
import { PROFILE } from "../../../constants/path-constants";
import HoverAction from "../../HoverAction/HoverAction";
import { TweetsActionType } from "../../../store/ducks/tweets/contracts/actionTypes";
import ScheduleModal from "../ScheduleModal/ScheduleModal";
import Poll from "../Poll/Poll";
import { TweetActionType } from "../../../store/ducks/tweet/contracts/actionTypes";
import CloseButton from "../../CloseButton/CloseButton";
import UnsentTweetsModal from "../UnsentTweetsModal/UnsentTweetsModal";
import { API_TWEETS_UPLOAD } from "../../../constants/endpoint-constants";
import { LoadingStatus, ReplyType } from "../../../types/common";
import EmojiIconButton from "../EmojiIconButton/EmojiIconButton";
import { ActionSnackbarTypes } from "../../../store/ducks/actionSnackbar/contracts/actionTypes";
import ScheduleIconButton from "../ScheduleIconButton/ScheduleIconButton";
import { AddTweetFormTypes } from "../../../store/ducks/addTweetForm/constants/actionTypes";

describe("AddTweetForm", () => {
    const mock = new MockAdapter(axios);
    const mockState = createMockRootState(LoadingStatus.LOADED);
    const mockUnsentTweet = { ...mockFullTweet, scheduledDate: "2022-10-15T21:20:33" };
    const mockTestMessage = "test";
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"} buttonName={"Tweet"} />, mockState);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar);
        expect(wrapper.find(Link).prop("to")).toBe(`${PROFILE}/${mockUser.id}`);
        expect(wrapper.find(TextareaAutosize).prop("placeholder")).toBe("What's happening?");
        expect(wrapper.find(Button).at(1).text()).toEqual("Tweet");
    });

    it("should render Unsent Tweet correctly and update", (done) => {
        const mockRootState = {
            ...mockState,
            addTweetForm: {
                ...mockState.addTweetForm,
                scheduledDate: new Date("2022-10-15T21:20:33"),
                images: mockFullTweet.images
            }
        };
        const wrapper = mountWithStore(
            <AddTweetForm
                unsentTweet={mockUnsentTweet}
                title={"What's happening?"}
                buttonName={"Tweet"}
            />, mockRootState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe(mockFullTweet.text);
        expect(wrapper.find("#tweetScheduleDate").text()).toBe("Will send on Sat, Oct 15, 2022 at 09:20 PM");
        expect(wrapper.find("#textCount").text()).toBe("269");
        expect(wrapper.find(IconButton).at(3).prop("disabled")).toBe(true);
        expect(wrapper.find(HoverAction).at(3).prop("actionText")).toBe("Poll");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: new Date("2022-10-15T21:20:33"),
            type: AddTweetFormTypes.SET_SCHEDULE_DATE
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: [{id: mockFullTweet.images[0].id, src: mockFullTweet.images[0].src}],
            type: AddTweetFormTypes.SET_IMAGES
        });

        mock.onPost(API_TWEETS_UPLOAD).reply(200, mockFullTweet.images[0]);

        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(3, {
                payload: {
                    id: mockFullTweet.id,
                    text: mockFullTweet.text,
                    images: [mockFullTweet.images[0]],
                    imageDescription: "",
                    taggedImageUsers: [],
                    replyType: ReplyType.EVERYONE
                }, type: TweetsActionType.UPDATE_SCHEDULED_TWEET
            });
            expect(mockDispatchFn).nthCalledWith(4, {
                payload: "Your Tweet will be sent on Sat, Oct 15, 2022 at 09:20 PM",
                type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
            });
        });
    });

    it("should add Tweet", (done) => {
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"} buttonName={"Tweet"} />, mockState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(Popover).at(1).prop("open")).toBe(false);

        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", { target: { value: mockTestMessage } });

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe(mockTestMessage);

        wrapper.find(EmojiIconButton).find(IconButton).simulate("click");

        expect(wrapper.find(Popover).at(1).prop("open")).toBe(true);

        wrapper.find(".emoji-mart-category-list").at(1).find("li").at(0).find("button").simulate("click");
        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    text: `${mockTestMessage} :+1:`,
                    images: [],
                    imageDescription: "",
                    taggedImageUsers: [],
                    replyType: ReplyType.EVERYONE
                }, type: TweetsActionType.ADD_TWEET
            });
            expect(mockDispatchFn).nthCalledWith(2, {
                payload: "Your Tweet was sent.",
                type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
            });
        });
    });

    it("should add Scheduled Tweet", (done) => {
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"} buttonName={"Tweet"}
                                                     onCloseModal={jest.fn()} />, mockState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(ScheduleIconButton).find(ScheduleModal).prop("visible")).toBe(false);

        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", { target: { value: mockTestMessage } });

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe(mockTestMessage);

        wrapper.find(ScheduleIconButton).find(IconButton).simulate("click");

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
        const mockRootState = {
            ...mockState,
            addTweetForm: {
                ...mockState.addTweetForm,
                visiblePoll: true,
                pollData: { ...mockState.addTweetForm.pollData, choice1: "test poll 1", choice2: "test poll 2" }
            }
        };
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"}
                                                     buttonName={"Tweet"} />, mockRootState);
        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(Poll).exists()).toBeTruthy();
        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", { target: { value: mockTestMessage } });
        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    text: mockTestMessage,
                    images: [],
                    imageDescription: "",
                    taggedImageUsers: [],
                    pollDateTime: 1440,
                    choices: ["test poll 1", "test poll 2"],
                    replyType: ReplyType.EVERYONE
                }, type: TweetsActionType.ADD_POLL
            });
            expect(mockDispatchFn).nthCalledWith(2, {
                payload: "Your Tweet was sent.",
                type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
            });
        });
    });

    it("should add Tweet with Quote", (done) => {
        const mockRootState = {
            ...mockState,
            addTweetForm: {
                ...mockState.addTweetForm,
                scheduledDate: new Date("2022-10-15T21:20:33"),
                images: mockFullTweet.images
            }
        };
        const mockUnsentTweet = { ...mockFullTweet, text: "" };
        const wrapper = mountWithStore(
            <AddTweetForm
                unsentTweet={mockUnsentTweet}
                quoteTweet={mockQuoteTweet}
                title={"What's happening?"}
                buttonName={"Tweet"}
                onCloseModal={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(IconButton).at(3).prop("disabled")).toBe(true);
        expect(wrapper.find(IconButton).at(5).prop("disabled")).toBe(true);

        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", { target: { value: mockTestMessage } });
        mock.onPost(API_TWEETS_UPLOAD).reply(200, mockFullTweet.images[0]);
        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(3, {
                payload: {
                    text: mockTestMessage,
                    images: [mockFullTweet.images[0]],
                    imageDescription: "",
                    taggedImageUsers: [],
                    replyType: ReplyType.EVERYONE,
                    tweetId: 13
                }, type: TweetsActionType.ADD_QUOTE_TWEET
            });
            expect(mockDispatchFn).nthCalledWith(4, {
                payload: "Your tweet was sent.",
                type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
            });
        });
    });

    it("should add Tweet reply", (done) => {
        const mockUnsentTweet = { ...mockFullTweet, text: "" };
        const wrapper = mountWithStore(
            <AddTweetForm
                unsentTweet={mockUnsentTweet}
                title={"What's happening?"}
                buttonName={"Reply"}
                addressedUsername={mockMyProfile.username}
                addressedId={mockMyProfile.id}
                tweetId={13}
                onCloseModal={jest.fn()}
            />, mockState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(Button).at(1).text()).toBe("Reply");

        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", { target: { value: mockTestMessage } });
        mock.onPost(API_TWEETS_UPLOAD).reply(200, mockFullTweet.images[0]);
        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(3, {
                payload: {
                    tweetId: 13,
                    text: mockTestMessage,
                    addressedUsername: mockMyProfile.username,
                    addressedId: mockMyProfile.id,
                    images: [],
                    imageDescription: "",
                    taggedImageUsers: [],
                    replyType: ReplyType.EVERYONE
                }, type: TweetActionType.FETCH_REPLY_TWEET
            });
            expect(mockDispatchFn).nthCalledWith(4, {
                payload: "Your tweet was sent.",
                type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
            });
        });
    });

    it("should open Schedule Modal and close", () => {
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"}
                                                     buttonName={"Tweet"} />, mockState);

        expect(wrapper.find(ScheduleModal).prop("visible")).toBe(false);

        wrapper.find(IconButton).at(4).simulate("click");
        expect(wrapper.find(ScheduleModal).prop("visible")).toBe(true);

        wrapper.find(ScheduleModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(ScheduleModal).prop("visible")).toBe(false);
    });

    it("should open Unsent Tweets Modal and close", () => {
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"}
                                                     buttonName={"Tweet"} />, mockState);

        expect(wrapper.find(ScheduleModal).prop("visible")).toBe(false);
        expect(wrapper.find(UnsentTweetsModal).prop("visible")).toBe(false);

        wrapper.find(IconButton).at(4).simulate("click");
        expect(wrapper.find(ScheduleModal).prop("visible")).toBe(true);

        wrapper.find(ScheduleModal).find(Button).at(1).simulate("click");
        expect(wrapper.find(UnsentTweetsModal).prop("visible")).toBe(true);

        wrapper.find(UnsentTweetsModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(UnsentTweetsModal).prop("visible")).toBe(false);
    });

    it("should click Clear Schedule Date", () => {
        const mockRootState = {
            ...mockState,
            addTweetForm: {
                ...mockState.addTweetForm,
                scheduledDate: new Date("2022-10-15T21:20:33"),
                images: mockFullTweet.images
            }
        };
        const wrapper = mountWithStore(
            <AddTweetForm
                unsentTweet={mockUnsentTweet}
                title={"What's happening?"}
                buttonName={"Tweet"}
            />, mockRootState);
        expect(wrapper.find(ScheduleModal).prop("visible")).toBe(false);
        expect(wrapper.find("#tweetScheduleDate").text()).toBe("Will send on Sat, Oct 15, 2022 at 09:20 PM");
        wrapper.find(IconButton).at(5).simulate("click");
        expect(wrapper.find(ScheduleModal).prop("visible")).toBe(true);
        wrapper.find(ScheduleModal).find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(3, { type: AddTweetFormTypes.CLEAR_SCHEDULE_DATE });
    });

    it("should render tweet with image and close", () => {
        const mockRootState = { ...mockState, addTweetForm: { ...mockState.addTweetForm, images: mockFullTweet.images } };
        jest.useFakeTimers();
        const wrapper = mountWithStore(
            <AddTweetForm
                unsentTweet={mockFullTweet}
                title={"What's happening?"}
                buttonName={"Tweet"}
            />, mockRootState);

        wrapper.find(IconButton).at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe(mockFullTweet.text);
        expect(wrapper.find("img").at(1).prop("src")).toBe(mockFullTweet.images[0].src);
        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(0).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(0).prop("actionText")).toBe("Remove");

        wrapper.find(IconButton).at(0).simulate("click");
    });

    it("should click open and close Popup", () => {
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"}
                                                     buttonName={"Tweet"} />, mockState);

        wrapper.find(EmojiIconButton).find(IconButton).simulate("click");

        expect(wrapper.find(Popover).at(1).prop("open")).toBe(true);
        // @ts-ignore
        wrapper.find(Popover).at(1).prop("onClose")(jest.fn());
    });

    it("should click Link and render user profile", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"}
                                                     buttonName={"Tweet"} />, mockState, history);

        wrapper.find(Link).simulate("click", { button: 0 });

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${PROFILE}/2`);
    });

    it("should hover Media icon and render Hover Action", () => {
        testHoverIcon(0, "Media");
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
        const wrapper = mountWithStore(<AddTweetForm title={"What's happening?"}
                                                     buttonName={"Tweet"} />, mockState);
        wrapper.find(IconButton).at(itemIndex).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(itemIndex).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(itemIndex).prop("actionText")).toBe(actionText);

        wrapper.find(IconButton).at(itemIndex).simulate("mouseleave");

        expect(wrapper.find(HoverAction).at(itemIndex).prop("visible")).toBe(false);
    };
});
