import React from "react";

import { mountWithStore } from "../../../../../util/test-utils/test-helper";
import ReportUserComponent from "../ReportUserComponent";

describe("ReportUserComponent", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ReportUserComponent username={"test_username"} />);
        expect(wrapper.text().includes("Report @test_username")).toBe(true);
    });
});
