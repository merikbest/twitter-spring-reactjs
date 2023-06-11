import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import AddDescription from "../AddDescription";
import { LoadingStatus } from "../../../../../types/common";
import ImageAction from "../../ImageAction/ImageAction";

describe("AddDescription", () => {

    it("should render correctly", () => {
        testAddDescriptionComponent();
    });

    it("should render description", () => {
        testAddDescriptionComponent("test description");
    });

    const testAddDescriptionComponent = (imageDescription = ""): void => {
        const mockStore = createMockRootState(LoadingStatus.SUCCESS);
        const mockListStore = {
            ...mockStore,
            addTweetForm: { ...mockStore.addTweetForm, imageDescription: imageDescription }
        };
        const wrapper = mountWithStore(<AddDescription />, mockListStore);
        expect(wrapper.find(ImageAction).prop("subtitle")).toBe(
            imageDescription === ""
                ? "Add description"
                : imageDescription);
    };
});
