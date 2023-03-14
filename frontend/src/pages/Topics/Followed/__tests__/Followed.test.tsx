import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import Followed, { topicsIds } from "../Followed";
import { LoadingStatus } from "../../../../types/common";
import Spinner from "../../../../components/Spinner/Spinner";
import { TopicsActionsType } from "../../../../store/ducks/topics/contracts/actionTypes";
import { mockTopics } from "../../../../util/test-utils/mock-test-data";
import TopicItem from "../../TopicItem/TopicItem";
import TopicBlock from "../../TopicBlock/TopicBlock";
import FollowedTopicButton from "../../TopicBlock/FollowedTopicButton/FollowedTopicButton";

describe("Followed", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    const mockState = {
        ...mockRootState, topics: {
            ...mockRootState,
            topics: mockTopics,
            followedTopics: mockTopics
        }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<Followed />, createMockRootState());
        expect(wrapper.find(Spinner).at(0).exists()).toBe(true);
        expect(wrapper.find(Spinner).at(1).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { topicsIds },
            type: TopicsActionsType.FETCH_TOPICS_BY_IDS
        });
        expect(mockDispatchFn).nthCalledWith(2, { type: TopicsActionsType.FETCH_FOLLOWED_TOPICS });
    });

    it("should render topics and followedTopics items", () => {
        const wrapper = mountWithStore(<Followed />, mockState);
        expect(wrapper.find(TopicItem).length).toEqual(3);
        expect(wrapper.find(TopicBlock).at(0).find(FollowedTopicButton).length).toEqual(3);
    });

    it("should reset Followed page", () => {
        const wrapper = mountWithStore(<Followed />, mockState);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(3, { type: TopicsActionsType.RESET_TOPICS_STATE });
    });

});
