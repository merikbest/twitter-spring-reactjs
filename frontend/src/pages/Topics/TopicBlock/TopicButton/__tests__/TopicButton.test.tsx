import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { mockTopics } from "../../../../../util/test-utils/mock-test-data";
import { TopicsActionsType } from "../../../../../store/ducks/topics/contracts/actionTypes";
import TopicButton from "../TopicButton";

describe("TopicButton", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render Topic follow button", () => {
        const wrapper = mountWithStore(<TopicButton topic={mockTopics[0]} />, createMockRootState());
        expect(wrapper.find("#plusIcon").exists()).toBeTruthy();
    });

    it("should render Topic unfollow button", () => {
        const wrapper = mountWithStore(<TopicButton topic={mockTopics[1]} />, createMockRootState());
        expect(wrapper.find("#checkIcon").exists()).toBeTruthy();
    });

    it("should click Follow Topic", () => {
        const wrapper = mountWithStore(<TopicButton topic={mockTopics[0]} />, createMockRootState());
        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { topicsId: mockTopics[0].id, topicCategory: mockTopics[0].topicCategory },
            type: TopicsActionsType.PROCESS_FOLLOW_TOPIC
        });
    });
});
