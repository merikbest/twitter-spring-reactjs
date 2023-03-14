import React from "react";

import ContentYouSee from "../ContentYouSee";
import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";

describe("ContentYouSee", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ContentYouSee />, createMockRootState());

        expect(wrapper.text().includes("Decide what you see on Twitter based on your preferences like Topics and interests")).toBe(true);
        expect(wrapper.text().includes("Display media that may contain sensitive content")).toBe(true);
        expect(wrapper.text().includes("Topics")).toBe(true);
        expect(wrapper.text().includes("Interests")).toBe(true);
        expect(wrapper.text().includes("Explore settings")).toBe(true);
        expect(wrapper.text().includes("Search settings")).toBe(true);
    });
});
