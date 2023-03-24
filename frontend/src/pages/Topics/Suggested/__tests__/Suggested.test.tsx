import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { topicsIds } from "../../Followed/Followed";
import Spinner from "../../../../components/Spinner/Spinner";
import { TopicsActionsType } from "../../../../store/ducks/topics/contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import Suggested from "../Suggested";
import { mockTopics } from "../../../../util/test-utils/mock-test-data";
import { TopicCategory } from "../../../../types/topic";

describe("Suggested", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Suggested />, createMockRootState());
        expect(wrapper.find(Spinner).at(0).exists()).toBe(true);
        expect(wrapper.find(Spinner).at(1).exists()).toBe(true);
        expect(wrapper.find(Spinner).at(2).exists()).toBe(true);
    });

    it("should click show more categories", () => {
        const wrapper = mountWithStore(<Suggested />, createMockRootState());
        expect(wrapper.text().includes("Show more")).toBe(true);
        wrapper.find("#clickShowMoreCategories").at(0).simulate("click");
        expect(wrapper.text().includes("Show more")).toBe(false);
    });

    it("should render topics", () => {
        const mockRootState = createMockRootState(LoadingStatus.LOADED);
        const mockState = {
            ...mockRootState,
            topics: {
                ...mockRootState.topics,
                topics: mockTopics,
                followedTopics: mockTopics,
                topicsByCategories: [
                    { topicCategory: TopicCategory.GAMING, topicsByCategories: mockTopics },
                    { topicCategory: TopicCategory.ONLY_ON_TWITTER, topicsByCategories: mockTopics },
                ]
            }
        };
        mountWithStore(<Suggested />, mockState);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { topicsIds },
            type: TopicsActionsType.FETCH_TOPICS_BY_IDS
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: { categories: ["GAMING", "ONLY_ON_TWITTER"] },
            type: TopicsActionsType.FETCH_TOPICS_BY_CATEGORIES
        });
    });

    it("should reset Suggested page", () => {
        const wrapper = mountWithStore(<Suggested />, createMockRootState());
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(3, { type: TopicsActionsType.RESET_TOPICS_STATE });
    });

});
