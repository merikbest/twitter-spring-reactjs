import React from "react";

import DataUsage from "../DataUsage";
import { createMockRootState, mountWithStore, testClickOnLink } from "../../../../../util/test-utils/test-helper";
import { SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY } from "../../../../../constants/path-constants";

describe("DataUsage", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<DataUsage />, createMockRootState());

        expect(wrapper.text().includes("Data saver")).toBe(true);
        expect(wrapper.text().includes("If selected, Twitter will use less network data.")).toBe(true);
        expect(wrapper.text().includes("Autoplay")).toBe(true);
        expect(wrapper.text().includes("Never")).toBe(true);
    });

    it("should link to Autoplay", () => {
        testClickOnLink(<DataUsage />, SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY, 0);
    });
});
