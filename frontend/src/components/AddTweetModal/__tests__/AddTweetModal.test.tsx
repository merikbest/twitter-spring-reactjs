import React from "react";
import { Dialog } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import AddTweetForm from "../../AddTweetForm/AddTweetForm";
import AddTweetModal from "../AddTweetModal";
import { LoadingStatus } from "../../../types/common";

describe("AddTweetModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(<AddTweetModal visible={true} onClose={mockOnClose} />, mockRootState);

        expect(mockOnClose).toHaveBeenCalled();
        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.find(AddTweetForm).prop("title")).toBe("What's happening?");
        expect(wrapper.find(AddTweetForm).prop("buttonName")).toBe("Tweet");
    });

    it("should render empty Add Tweet Modal correctly", () => {
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(<AddTweetModal visible={false} onClose={mockOnClose} />, mockRootState);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
