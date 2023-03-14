import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { mockFullTweet } from "../../../util/test-utils/mock-test-data";
import { TweetsActionType } from "../../../store/ducks/tweets/contracts/actionTypes";
import VoteComponent from "../VoteComponent";
import { LoadingStatus } from "../../../types/common";

describe("VoteComponent", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockPoll = mockFullTweet.poll;
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<VoteComponent tweetId={1} poll={mockPoll} />, mockRootState);
        expect(wrapper.find(`#choice_${mockPoll.pollChoices[0].id}`).text().includes(mockPoll.pollChoices[0].choice)).toBe(true);
        expect(wrapper.find(`#choice_${mockPoll.pollChoices[0].id}`).text().includes("100%")).toBe(true);
        expect(wrapper.find(`#choice_${mockPoll.pollChoices[1].id}`).text().includes(mockPoll.pollChoices[1].choice)).toBe(true);
        expect(wrapper.find(`#choice_${mockPoll.pollChoices[1].id}`).text().includes("0%")).toBe(true);
        expect(wrapper.find(`#choice_${mockPoll.pollChoices[2].id}`).text().includes(mockPoll.pollChoices[2].choice)).toBe(true);
        expect(wrapper.find(`#choice_${mockPoll.pollChoices[2].id}`).text().includes("0%")).toBe(true);
        expect(wrapper.text().includes("1 votes · Final results")).toBe(true);
    });

    it("should render empty voted poll and click vote", () => {
        const mockEmptyPollVotes = {
            ...mockPoll,
            dateTime: "2222-04-11T16:53:49.696909",
            pollChoices: [
                { id: 100, choice: "test choice 1", votedUser: [] },
                { id: 101, choice: "test choice 2", votedUser: [] },
                { id: 102, choice: "test choice 3", votedUser: [] }
            ]
        };
        const wrapper = mountWithStore(<VoteComponent tweetId={1} poll={mockEmptyPollVotes} />, mockRootState);
        expect(wrapper.find(Button).at(0).text().includes(mockPoll.pollChoices[0].choice)).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes(mockPoll.pollChoices[1].choice)).toBe(true);
        expect(wrapper.find(Button).at(2).text().includes(mockPoll.pollChoices[2].choice)).toBe(true);
        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { tweetId: 1, pollId: 100, pollChoiceId: 100 },
            type: TweetsActionType.VOTE
        });
    });
});
