import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import Sessions from "../Sessions";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { ACCESS_TO_THIRD_PARTY_APPS } from "../../../../../../constants/url-constants";

Object.defineProperty(window.navigator, "userAgent", {
    value: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/600.1.2 (KHTML, like Gecko) Version/13.0.0 Safari/600.1.2"
});

describe("Sessions", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Sessions />, createMockRootState());
        expect(wrapper.text().includes("Current active session")).toBe(true);
        expect(wrapper.text().includes("Log out of other sessions")).toBe(true);
        expect(wrapper.text().includes("Logging out will end 1 of your other active Twitter sessions.")).toBe(true);
        expect(wrapper.text().includes("Log out of all other sessions")).toBe(true);
        expect(wrapper.text().includes("macOS")).toBe(true);
        expect(wrapper.find(MuiLink).prop("href")).toBe(ACCESS_TO_THIRD_PARTY_APPS);
    });
});
