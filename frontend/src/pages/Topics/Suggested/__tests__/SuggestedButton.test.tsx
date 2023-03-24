import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import SuggestedButton from "../SuggestedButton";

describe("SuggestedButton", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<SuggestedButton text={"test"} />, createMockRootState());
        expect(wrapper.text().includes("test")).toBe(true);
    });
});
