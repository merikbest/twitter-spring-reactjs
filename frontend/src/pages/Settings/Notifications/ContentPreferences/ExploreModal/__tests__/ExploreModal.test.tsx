import React from "react";
import { Checkbox, Dialog, IconButton } from "@material-ui/core";

import ExploreModal from "../ExploreModal";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import CloseButton from "../../../../../../components/CloseButton/CloseButton";
import { LoadingStatus } from "../../../../../../types/common";

describe("ExploreModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render empty ExploreModal", () => {
        const wrapper = mountWithStore(
            <ExploreModal
                visible={false}
                onClose={jest.fn()}
                isSearchModal={true}
            />, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should render Search settings ExploreModal", () => {
        const wrapper = mountWithStore(
            <ExploreModal
                visible={true}
                onClose={jest.fn()}
                isSearchModal={true}
            />, mockStore);

        expect(wrapper.text().includes("Search settings")).toBe(true);
        expect(wrapper.text().includes("Hide sensitive content")).toBe(true);
        expect(wrapper.text().includes("This prevents Tweets with potentially sensitive content from displaying in your search results.")).toBe(true);
        expect(wrapper.text().includes("Remove blocked and muted accounts")).toBe(true);
        expect(wrapper.text().includes("Use this to eliminate search results from accounts you’ve blocked or muted.")).toBe(true);
    });

    it("should render Explore settings ExploreModal", () => {
        const wrapper = mountWithStore(
            <ExploreModal
                visible={true}
                onClose={jest.fn()}
                isSearchModal={false}
            />, mockStore);

        expect(wrapper.text().includes("Explore settings")).toBe(true);
        expect(wrapper.text().includes("Location")).toBe(true);
        expect(wrapper.text().includes("Show content in this location")).toBe(true);
        expect(wrapper.text().includes("When this is on, you’ll see what’s happening around you right now.")).toBe(true);
        expect(wrapper.text().includes("Personalization")).toBe(true);
        expect(wrapper.text().includes("Trends for you")).toBe(true);
        expect(wrapper.text().includes("You can personalize trends based on your location and who you follow.")).toBe(true);
    });

    it("should close on Checkbox", () => {
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(
            <ExploreModal
                visible={true}
                onClose={mockOnClose}
                isSearchModal={true}
            />, mockStore);

        wrapper.find(CloseButton).find(IconButton).simulate("click");

        expect(mockOnClose).toHaveBeenCalled();
    });
});
