import React from "react";
import {IconButton} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import ImageCloseButton from "../ImageCloseButton";

describe("ImageCloseButton", () => {
    it("should render correctly", () => {
        const mockOnCloseModalWindow = jest.fn();
        const wrapper = mountWithStore(
            <ImageCloseButton
                onCloseModalWindow={mockOnCloseModalWindow}
            />, createMockRootState(LoadingStatus.SUCCESS));
        wrapper.find(IconButton).simulate("click");
        expect(mockOnCloseModalWindow).toHaveBeenCalled()
    });
});
