import { createMockRootState } from "../../../../util/test-utils/test-helper";
import {
    selectGif,
    selectGifs,
    selectImageDescription,
    selectImages,
    selectIsGifsLoaded,
    selectIsGifsLoading,
    selectPollData,
    selectReplyType,
    selectScheduledDate,
    selectSelectedUsers,
    selectVisiblePoll
} from "../selector";
import { pollInitialState } from "../reducer";
import { mockGiphyData, mockUsers } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus, ReplyType } from "../../../../types/common";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";

describe("addTweetForm selectors:", () => {
    const mockDate = new Date();
    const mockImage = [{ src: "test" }] as ImageObj[];
    const mockState = createMockRootState();
    const mockRootState = {
        ...mockState,
        addTweetForm: {
            ...mockState.addTweetForm,
            gif: mockGiphyData[0],
            scheduledDate: mockDate,
            replyType: ReplyType.MENTION,
            images: mockImage,
            imageDescription: "test_text",
            selectedUsers: mockUsers,
            gifs: mockGiphyData
        }
    };

    describe("selectVisiblePoll", () => {
        it("should return boolean", () => {
            expect(selectVisiblePoll(mockState)).toBe(false);
        });
    });

    describe("selectPollData", () => {
        it("should return PollInitialState", () => {
            expect(selectPollData(mockState)).toBe(pollInitialState);
        });
    });

    describe("selectGif", () => {
        it("should return GiphyDataProps", () => {
            expect(selectGif(mockRootState)).toBe(mockGiphyData[0]);
        });
    });

    describe("selectScheduledDate", () => {
        it("should return Date", () => {
            expect(selectScheduledDate(mockRootState)).toBe(mockDate);
        });
    });

    describe("selectReplyType", () => {
        it("should return ReplyType", () => {
            expect(selectReplyType(mockRootState)).toBe(ReplyType.MENTION);
        });
    });

    describe("selectImages", () => {
        it("should return ImageObj array", () => {
            expect(selectImages(mockRootState)).toBe(mockImage);
        });
    });

    describe("selectImageDescription", () => {
        it("should return string", () => {
            expect(selectImageDescription(mockRootState)).toBe("test_text");
        });
    });

    describe("selectSelectedUsers", () => {
        it("should return UserResponse array", () => {
            expect(selectSelectedUsers(mockRootState)).toBe(mockUsers);
        });
    });

    describe("selectGifs", () => {
        it("should return GiphyDataProps array", () => {
            expect(selectGifs(mockRootState)).toBe(mockGiphyData);
        });
    });

    describe("selectIsGifsLoading", () => {
        it("should return LoadingStatus.LOADING", () => {
            expect(selectIsGifsLoading({
                ...mockState, addTweetForm: { ...mockState.addTweetForm, loadingState: LoadingStatus.LOADING }
            })).toBe(true);
        });
    });

    describe("selectIsGifsLoaded", () => {
        it("should return LoadingStatus.LOADED", () => {
            expect(selectIsGifsLoaded({
                ...mockState, addTweetForm: { ...mockState.addTweetForm, loadingState: LoadingStatus.LOADED }
            })).toBe(true);
        });
    });
});
