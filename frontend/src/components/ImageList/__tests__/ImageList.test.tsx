import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import ImageList from "../ImageList";
import { LoadingStatus } from "../../../types/common";

describe("ImageList", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const mockRemoveImage = jest.fn();
        const wrapper = mountWithStore(
            <ImageList images={[{ id: 1, src: "test_img" }]} removeImage={mockRemoveImage} />, mockRootState);

        wrapper.find(IconButton).at(0).simulate("click");

        expect(wrapper.find(IconButton).at(0).exists()).toBeTruthy();
        expect(wrapper.find("img").at(0).prop("src")).toBe("test_img");
        expect(mockRemoveImage).toHaveBeenCalled();
        expect(mockRemoveImage).toHaveBeenCalledWith("test_img");
    });
});
