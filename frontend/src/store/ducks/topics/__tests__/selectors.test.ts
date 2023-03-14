import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockTopics } from "../../../../util/test-utils/mock-test-data";
import {
    selectFollowedTopicsItems,
    selectIsFollowedTopicsLoading,
    selectIsTopicsByCategoriesLoading,
    selectIsTopicsLoading,
    selectTopicsByCategories,
    selectTopicsItems
} from "../selectors";
import { TopicCategory } from "../../../../types/topic";
import { LoadingStatus } from "../../../../types/common";

describe("topics selectors:", () => {
    const mockState = createMockRootState();

    describe("selectTopicsItems", () => {
        it("should return TopicResponse array", () => {
            expect(selectTopicsItems({
                ...mockState,
                topics: { ...mockState.topics, topics: mockTopics }
            })).toBe(mockTopics);
        });
    });

    describe("selectFollowedTopicsItems", () => {
        it("should return TopicResponse array", () => {
            expect(selectFollowedTopicsItems({
                ...mockState,
                topics: { ...mockState.topics, followedTopics: mockTopics }
            })).toBe(mockTopics);
        });
    });

    describe("selectTopicsByCategories", () => {
        it("should return TopicsByCategoriesResponse array", () => {
            expect(selectTopicsByCategories({
                ...mockState,
                topics: {
                    ...mockState.topics,
                    topicsByCategories: [{ topicCategory: TopicCategory.GAMING, topicsByCategories: mockTopics }]
                }
            })).toStrictEqual([{ topicCategory: TopicCategory.GAMING, topicsByCategories: mockTopics }]);
        });
    });

    describe("selectIsTopicsLoading", () => {
        it("should return Topics Loading state", () => {
            expect(selectIsTopicsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });

        it("should return Followed Topics state", () => {
            expect(selectIsFollowedTopicsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });

        it("should return Topics By Categories Loading state", () => {
            expect(selectIsTopicsByCategoriesLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });
});
