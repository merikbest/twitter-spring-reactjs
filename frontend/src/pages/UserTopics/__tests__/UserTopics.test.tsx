import React from "react";
import ReactRouter from "react-router";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../types/common";
import { TopicsActionsType } from "../../../store/ducks/topics/contracts/actionTypes";
import Spinner from "../../../components/Spinner/Spinner";
import { mockTopics } from "../../../util/test-utils/mock-test-data";
import TopicItem from "../../Topics/TopicItem/TopicItem";
import UserTopics from "../UserTopics";

describe("UserTopics", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ userId: "2" });
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<UserTopics />, createMockRootState());
        expect(wrapper.text().includes("Topics")).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render list of Topics", () => {
        const mockState = { ...mockRootState, topics: { ...mockRootState.topics, followedTopics: mockTopics } };
        const wrapper = mountWithStore(<UserTopics />, mockState);
        expect(wrapper.find(TopicItem).length).toEqual(3);
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: 2,
            type: TopicsActionsType.FETCH_FOLLOWED_TOPICS_BY_USER_ID
        });
    });

    it("should render empty list of Topics", () => {
        const mockState = { ...mockRootState, topics: { ...mockRootState.topics, followedTopics: [] } };
        const wrapper = mountWithStore(<UserTopics />, mockState);
        expect(wrapper.text().includes("User isn’t following any Topics.")).toBe(true);
        expect(wrapper.text().includes("When they do, it will be listed here.")).toBe(true);
    });

    it("should unmount UserTopics", () => {
        const wrapper = mountWithStore(<UserTopics />, mockRootState);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(3, { type: TopicsActionsType.RESET_TOPICS_STATE });
    });
});
