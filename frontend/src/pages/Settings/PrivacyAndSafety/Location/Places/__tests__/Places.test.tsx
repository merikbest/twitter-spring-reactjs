import React from "react";

import Places from "../Places";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";

describe("Places", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Places />, createMockRootState());

        expect(wrapper.text().includes("These are the places Twitter uses to show you more relevant content.")).toBe(true);
        expect(wrapper.text().includes("Unknown")).toBe(true);
        expect(wrapper.text().includes("Remove")).toBe(true);
    });
});
