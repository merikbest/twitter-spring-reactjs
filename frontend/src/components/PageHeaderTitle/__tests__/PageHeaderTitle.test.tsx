import React from "react";

import { mountWithStore } from "../../../util/test-utils/test-helper";
import PageHeaderTitle from "../PageHeaderTitle";

describe("PageHeaderTitle", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<PageHeaderTitle title={"Title"} subtitle={"Subtitle"} />);
        expect(wrapper.text().includes("Title")).toBe(true);
        expect(wrapper.text().includes("Subtitle")).toBe(true);
    });
});
