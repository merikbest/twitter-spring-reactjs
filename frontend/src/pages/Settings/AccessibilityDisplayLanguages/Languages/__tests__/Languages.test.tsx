import React from "react";

import Languages from "../Languages";
import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { mockUser } from "../../../../../util/test-utils/mock-test-data";

describe("Languages", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Languages />, createMockRootState());

        expect(wrapper.text().includes("Manage which languages are used to personalize your Twitter experience.")).toBe(true);
        expect(wrapper.text().includes("Display language")).toBe(true);
        expect(wrapper.text().includes("Select additional languages")).toBe(true);
        expect(wrapper.text().includes(mockUser.language)).toBe(true);
    });
});
