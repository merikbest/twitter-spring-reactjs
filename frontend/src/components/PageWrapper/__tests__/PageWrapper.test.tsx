import React from "react";

import { mountWithStore } from "../../../util/test-utils/test-helper";
import PageWrapper from "../PageWrapper";

describe("PageWrapper", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<PageWrapper title={"Title"} children={<p>Children</p>} />);
        expect(wrapper.text().includes("Title")).toBe(true);
        expect(wrapper.text().includes("Children")).toBe(true);
    });
});
