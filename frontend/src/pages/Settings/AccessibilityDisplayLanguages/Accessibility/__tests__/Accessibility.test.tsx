import React from "react";

import { createMockRootState, mountWithStore, testClickOnLink } from "../../../../../util/test-utils/test-helper";
import Accessibility from "../Accessibility";
import { SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY } from "../../../../../constants/path-constants";

describe("Accessibility", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<Accessibility />, createMockRootState());

        expect(wrapper.text().includes("Vision")).toBe(true);
        expect(wrapper.text().includes("Increase color contrast")).toBe(true);
        expect(wrapper.text().includes("Improves legibility by increasing the contrast between text and background colors.")).toBe(true);
        expect(wrapper.text().includes("Motion")).toBe(true);
        expect(wrapper.text().includes("Reduce motion")).toBe(true);
        expect(wrapper.text().includes("Autoplay")).toBe(true);
    });

    it("should link to Autoplay", () => {
        testClickOnLink(<Accessibility />, SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY, 0);
    });
});
