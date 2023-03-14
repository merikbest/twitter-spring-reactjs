import React from "react";
import { Checkbox } from "@material-ui/core";

import PersonalizationAndData from "../PersonalizationAndData";
import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";

describe("PersonalizationAndData", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PersonalizationAndData />, createMockRootState());

        expect(wrapper.text().includes("Control how Twitter personalizes content and collects and shares certain data.")).toBe(true);
        expect(wrapper.text().includes("Personalization and data")).toBe(true);
        expect(wrapper.text().includes("Personalization")).toBe(true);
        expect(wrapper.text().includes("Personalize based on your inferred identity")).toBe(true);
        expect(wrapper.text().includes("Personalize based on the places you’ve been")).toBe(true);
        expect(wrapper.text().includes("Data")).toBe(true);
    });

    it("should click on Checkbox", () => {
        const wrapper = mountWithStore(<PersonalizationAndData />, createMockRootState());

        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(false);
        expect(wrapper.find(Checkbox).at(1).prop("checked")).toBe(true);
        expect(wrapper.find(Checkbox).at(2).prop("checked")).toBe(true);
        expect(wrapper.find(Checkbox).at(3).prop("checked")).toBe(true);
        expect(wrapper.find(Checkbox).at(4).prop("checked")).toBe(false);

        wrapper.find(Checkbox).at(0).find("input").simulate("change");
        wrapper.find(Checkbox).at(1).find("input").simulate("change");
        wrapper.find(Checkbox).at(2).find("input").simulate("change");
        wrapper.find(Checkbox).at(3).find("input").simulate("change");
        wrapper.find(Checkbox).at(4).find("input").simulate("change");

        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(true);
        expect(wrapper.find(Checkbox).at(1).prop("checked")).toBe(false);
        expect(wrapper.find(Checkbox).at(2).prop("checked")).toBe(false);
        expect(wrapper.find(Checkbox).at(3).prop("checked")).toBe(false);
        expect(wrapper.find(Checkbox).at(4).prop("checked")).toBe(true);
    });
});
