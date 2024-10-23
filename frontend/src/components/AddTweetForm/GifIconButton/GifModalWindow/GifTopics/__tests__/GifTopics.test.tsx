import React from "react";
import { ImageListItem } from "@material-ui/core";

import GifTopics from "../GifTopics";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../types/common";
import { LocalizationActionsType } from "../../../../../../store/ducks/localization/contracts/actionTypes";
import Spinner from "../../../../../Spinner/Spinner";
import { gifImage } from "../../../../../../util/test-utils/mock-test-data";

describe("GifTopics", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADING);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<GifTopics onClickGifTopic={jest.fn()} />, mockRootState);

        expect(wrapper.find(Spinner).exists()).toBe(true);

        expect(mockDispatchFn).nthCalledWith(1, { type: LocalizationActionsType.FETCH_GIF_IMAGES });
    });

    it("should render gif images items and click gif topic", () => {
        const mockState = {
            ...mockRootState,
            localization: {
                ...mockRootState,
                gifImages: gifImage,
                loadingState: LoadingStatus.LOADED
            }
        };
        const mockOnClickGifTopic = jest.fn();
        const wrapper = mountWithStore(<GifTopics onClickGifTopic={mockOnClickGifTopic} />, mockState);

        wrapper.find(ImageListItem).at(0).simulate("click");

        expect(mockOnClickGifTopic).toHaveBeenCalled();
        expect(wrapper.find(ImageListItem).length).toEqual(5);
    });

    it("should reset GifTopics", () => {
        const wrapper = mountWithStore(<GifTopics onClickGifTopic={jest.fn()} />, mockRootState);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: LocalizationActionsType.RESET_LOCALIZATION_STATE });
    });
});
