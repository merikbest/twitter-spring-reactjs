import React from "react";
import { Button, Dialog } from "@material-ui/core";

import RecommendationsModal from "../RecommendationsModal";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../types/common";

describe("RecommendationsModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render empty RecommendationsModal", () => {
        const wrapper = mountWithStore(<RecommendationsModal visible={false} onClose={jest.fn()} />, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should render correctly RecommendationsModal and close", () => {
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(<RecommendationsModal visible={true} onClose={mockOnClose} />, mockStore);

        expect(wrapper.text().includes("Which languages do you speak?")).toBe(true);
        expect(wrapper.text().includes("You’ll be able to see Tweets, people, and trends in any languages you choose.")).toBe(true);
        expect(wrapper.text().includes("English")).toBe(true);
        expect(wrapper.text().includes("Russian - русский")).toBe(true);
        expect(wrapper.text().includes("Chinese - 中文")).toBe(true);

        wrapper.find(Button).simulate("click");

        expect(mockOnClose).toHaveBeenCalled();
    });
});
