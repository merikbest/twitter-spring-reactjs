import React from "react";

import AdditionalResources from "../AdditionalResources";
import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";

describe("AdditionalResources", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AdditionalResources />, createMockRootState());

        expect(wrapper.text().includes("Check out other places for helpful information to learn more about Twitter products and services.")).toBe(true);
        expect(wrapper.text().includes("Release notes")).toBe(true);
        expect(wrapper.text().includes("Privacy policy")).toBe(true);
        expect(wrapper.text().includes("Legal")).toBe(true);
        expect(wrapper.text().includes("Ads info")).toBe(true);
        expect(wrapper.text().includes("Cookie Policy")).toBe(true);
        expect(wrapper.text().includes("Privacy Policy")).toBe(true);
        expect(wrapper.text().includes("Terms of Service")).toBe(true);
        expect(wrapper.text().includes("Miscellaneous")).toBe(true);
        expect(wrapper.text().includes("About")).toBe(true);
        expect(wrapper.text().includes("Advertising")).toBe(true);
        expect(wrapper.text().includes("Blog")).toBe(true);
        expect(wrapper.text().includes("Brand Resources")).toBe(true);
        expect(wrapper.text().includes("Careers")).toBe(true);
        expect(wrapper.text().includes("Developers")).toBe(true);
    });
});
