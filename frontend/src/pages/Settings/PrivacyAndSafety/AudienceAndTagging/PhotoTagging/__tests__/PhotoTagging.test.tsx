import React from "react";
import { Radio } from "@material-ui/core";

import PhotoTagging from "../PhotoTagging";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";

describe("PhotoTagging", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PhotoTagging />, createMockRootState());

        expect(wrapper.text().includes("Photo tagging")).toBe(true);
        expect(wrapper.text().includes("Anyone can tag you")).toBe(true);
        expect(wrapper.text().includes("Only people you follow can tag you")).toBe(true);
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(true);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(false);

        wrapper.find(Radio).at(1).find("input").simulate("change");

        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(false);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(true);
    });
});
