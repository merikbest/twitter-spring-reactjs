import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { mockTopics } from "../../../../../util/test-utils/mock-test-data";
import FollowedTopicButton from "../FollowedTopicButton";
import { TopicsActionsType } from "../../../../../store/ducks/topics/contracts/actionTypes";

describe("FollowedTopicButton", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click follow topic", () => {
        const wrapper = mountWithStore(<FollowedTopicButton topic={mockTopics[1]} />, createMockRootState());
        expect(wrapper.find("#checkIcon").exists()).toBeTruthy();
        wrapper.find("div").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { topicsId: mockTopics[1].id, topicCategory: mockTopics[1].topicCategory },
            type: TopicsActionsType.PROCESS_FOLLOW_TOPIC
        });
    });

    it("should click not interested topic", () => {
        const wrapper = mountWithStore(<FollowedTopicButton topic={mockTopics[0]} />, createMockRootState());
        expect(wrapper.find("#closeIcon").exists()).toBeTruthy();
        wrapper.find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload:  mockTopics[0].id,
            type: TopicsActionsType.PROCESS_NOT_INTERESTED_TOPIC
        });
    });
});
