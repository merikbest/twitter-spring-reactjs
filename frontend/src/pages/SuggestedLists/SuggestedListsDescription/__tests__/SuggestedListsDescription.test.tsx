import React from "react";

import { mountWithStore } from "../../../../util/test-utils/test-helper";
import SuggestedListsDescription from "../SuggestedListsDescription";

describe("SuggestedListsDescription", () => {
    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<SuggestedListsDescription />);
        expect(wrapper.text().includes("Suggested Lists")).toBe(true);
        expect(wrapper.text().includes("Choose your Lists")).toBe(true);
        expect(wrapper.text().includes("When you follow a List")).toBe(true);
        expect(wrapper.text().includes("Discover new Lists")).toBe(true);
    });
});
