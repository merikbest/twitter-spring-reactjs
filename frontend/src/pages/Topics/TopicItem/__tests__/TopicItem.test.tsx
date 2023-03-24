import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockTopics } from "../../../../util/test-utils/mock-test-data";
import FollowTopicButton from "../FollowTopicButton/FollowTopicButton";
import UnfollowTopicButton from "../UnfollowTopicButton/UnfollowTopicButton";
import { TopicsActionsType } from "../../../../store/ducks/topics/contracts/actionTypes";
import TopicItem from "../TopicItem";

describe("TopicItem", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render FollowTopicButton", () => {
        const wrapper = mountWithStore(<TopicItem topic={mockTopics[0]} />, createMockRootState());
        expect(wrapper.find(FollowTopicButton).at(0).exists()).toBe(true);
    });

    it("should render UnfollowTopicButton", () => {
        const wrapper = mountWithStore(<TopicItem topic={mockTopics[1]} />, createMockRootState());
        expect(wrapper.find(UnfollowTopicButton).at(0).exists()).toBe(true);
    });

    it("should click follow topic", () => {
        const wrapper = mountWithStore(<TopicItem topic={mockTopics[0]} />, createMockRootState());
        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { topicsId: mockTopics[0].id, topicCategory: mockTopics[0].topicCategory },
            type: TopicsActionsType.PROCESS_FOLLOW_TOPIC
        });
    });
});
