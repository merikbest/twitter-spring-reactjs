import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import TopicBlock from "../TopicBlock";
import { mockTopics } from "../../../../util/test-utils/mock-test-data";
import FollowedTopicButton from "../FollowedTopicButton/FollowedTopicButton";
import TopicButton from "../TopicButton/TopicButton";

describe("TopicBlock", () => {

    it("should render FollowedTopicButton", () => {
        const wrapper = mountWithStore(
            <TopicBlock topics={mockTopics} startTopicValue={0} endTopicValue={5} isFollowedTopic />,
            createMockRootState());
        expect(wrapper.find(FollowedTopicButton).length).toEqual(3);
    });

    it("should render TopicButton", () => {
        const wrapper = mountWithStore(
            <TopicBlock topics={mockTopics} startTopicValue={0} endTopicValue={5} />,
            createMockRootState());
        expect(wrapper.find(TopicButton).length).toEqual(3);
    });
});
