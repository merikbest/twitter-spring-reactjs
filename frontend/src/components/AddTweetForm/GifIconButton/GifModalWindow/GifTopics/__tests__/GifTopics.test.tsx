import React from "react";
import { ImageListItem } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../types/common";
import GifTopics from "../GifTopics";

describe("GifTopics", () => {
    it("should render correctly", () => {
        const mockRootState = createMockRootState(LoadingStatus.LOADED);
        const mockOnClickGifTopic = jest.fn();
        const wrapper = mountWithStore(<GifTopics onClickGifTopic={mockOnClickGifTopic} />, mockRootState);
        expect(wrapper.find(ImageListItem).length).toEqual(10);
        wrapper.find(ImageListItem).at(0).simulate("click");
        expect(mockOnClickGifTopic).toHaveBeenCalled();
    });
});
