import React from "react";

import YourAdvertiserList from "../YourAdvertiserList";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";

describe("YourAdvertiserList", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<YourAdvertiserList />, createMockRootState());

        expect(wrapper.text().includes("Tailored audiences are often built from email lists or browsing behaviors.")).toBe(true);
        expect(wrapper.text().includes("You are currently a part of")).toBe(true);
        expect(wrapper.text().includes("0 advertisers")).toBe(true);
        expect(wrapper.text().includes("You can opt out of interest-based advertising in your personalization and data settings.")).toBe(true);
    });
});
