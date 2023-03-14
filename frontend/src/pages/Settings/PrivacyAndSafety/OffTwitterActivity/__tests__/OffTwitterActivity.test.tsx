import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import OffTwitterActivity from "../OffTwitterActivity";
import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { ACROSS_YOUR_DEVICES, TAILORED_SUGGESTIONS } from "../../../../../constants/url-constants";

describe("OffTwitterActivity", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<OffTwitterActivity />, createMockRootState());
        expect(wrapper.text().includes("Manage how Twitter uses your online activity outside of Twitter")).toBe(true);
        expect(wrapper.text().includes("Allow use of where you see Twitter content across the Web")).toBe(true);
        expect(wrapper.text().includes("Personalize based on your inferred identity")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(TAILORED_SUGGESTIONS);
        expect(wrapper.find(MuiLink).at(1).prop("href")).toBe(ACROSS_YOUR_DEVICES);
    });
});
