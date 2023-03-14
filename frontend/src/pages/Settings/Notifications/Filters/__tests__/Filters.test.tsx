import React from "react";

import Filters from "../Filters";
import { createMockRootState, mountWithStore, testClickOnLink } from "../../../../../util/test-utils/test-helper";
import { SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS } from "../../../../../constants/path-constants";

describe("Filters", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Filters />, createMockRootState());

        expect(wrapper.text().includes("Choose the notifications you’d like to see — and those you don’t.")).toBe(true);
        expect(wrapper.text().includes("Quality filter")).toBe(true);
        expect(wrapper.text().includes("Muted notifications")).toBe(true);
    });

    it("should link to Advanced filters", () => {
        testClickOnLink(<Filters />, SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS, 0);
    });
});
