import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockTopics } from "../../../../util/test-utils/mock-test-data";
import Spinner from "../../../../components/Spinner/Spinner";
import { TopicsActionsType } from "../../../../store/ducks/topics/contracts/actionTypes";
import NotInterested from "../NotInterested";
import TopicItem from "../../TopicItem/TopicItem";

describe("NotInterested", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<NotInterested />, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, { type: TopicsActionsType.FETCH_NOT_INTERESTED_TOPICS });
    });

    it("should render EmptyPageDescription", () => {
        const wrapper = mountWithStore(<NotInterested />, mockRootState);
        expect(wrapper.text().includes("No interest? No problem.")).toBe(true);
    });

    it("should render TopicItems", () => {
        const mockState = { ...mockRootState, topics: { ...mockRootState.topics, topics: mockTopics } };
        const wrapper = mountWithStore(<NotInterested />, mockState);
        expect(wrapper.find(TopicItem).length).toEqual(3);
    });

    it("should reset NotInterested page", () => {
        const wrapper = mountWithStore(<NotInterested />, mockRootState);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: TopicsActionsType.RESET_TOPICS_STATE });
    });
});
