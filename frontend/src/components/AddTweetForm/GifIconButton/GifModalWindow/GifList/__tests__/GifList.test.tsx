import React from "react";
import { ImageListItem } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../types/common";
import { mockGiphyData } from "../../../../../../util/test-utils/mock-test-data";
import GifList from "../GifList";

describe("GifList", () => {
    it("should render correctly", () => {
        const mockRootState = createMockRootState(LoadingStatus.LOADED);
        const mockState = { ...mockRootState, addTweetForm: { ...mockRootState.addTweetForm, gifs: mockGiphyData } };
        const mockOnClickGif = jest.fn();
        const wrapper = mountWithStore(<GifList onClickGif={mockOnClickGif} />, mockState);
        expect(wrapper.find(ImageListItem).length).toEqual(2);
        wrapper.find(ImageListItem).at(0).simulate("click");
        expect(mockOnClickGif).toHaveBeenCalled();
    });
});
