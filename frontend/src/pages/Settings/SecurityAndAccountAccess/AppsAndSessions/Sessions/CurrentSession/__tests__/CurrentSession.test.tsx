import React from "react";
import routeData from "react-router";

import CurrentSession from "../CurrentSession";
import { createMockRootState, mountWithStore } from "../../../../../../../util/test-utils/test-helper";
import { SETTINGS_SECURITY_SESSIONS_CURRENT } from "../../../../../../../constants/path-constants";

describe("CurrentSession", () => {
    it("should render correctly", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: SETTINGS_SECURITY_SESSIONS_CURRENT,
            hash: "",
            search: "",
            state: { OSName: "macOS", browserName: "Mozilla", countryName: "USA" }
        });
        const wrapper = mountWithStore(<CurrentSession />, createMockRootState());

        expect(wrapper.text().includes("macOS")).toBe(true);
        expect(wrapper.text().includes("Mozilla")).toBe(true);
        expect(wrapper.text().includes("USA")).toBe(true);
        expect(wrapper.text().includes("Date and time")).toBe(true);
        expect(wrapper.text().includes("Active now")).toBe(true);
        expect(wrapper.text().includes("Location")).toBe(true);
    });
});
