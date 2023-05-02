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
        const wrapper = mountWithStore(
            <AddDescription
                imageSrc={"test"}
                imageDescription={imageDescription}
                handleChangeDescription={jest.fn()}
            />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(ImageAction).prop("subtitle")).toBe(
            imageDescription === ""
                ? "Add description"
                : imageDescription);
    };
});
