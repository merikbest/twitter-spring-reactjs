import React from "react";
import { Radio } from "@material-ui/core";

import EmailNotifications from "../EmailNotifications";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";

describe("EmailNotifications", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<EmailNotifications />, createMockRootState());

        expect(wrapper.text().includes("Email notifications")).toBe(true);
        expect(wrapper.text().includes("Related to you and your Tweets")).toBe(true);
        expect(wrapper.text().includes("New notifications")).toBe(true);
        expect(wrapper.text().includes("Direct messages")).toBe(true);
        expect(wrapper.text().includes("Tweets emailed to you")).toBe(true);
        expect(wrapper.text().includes("Top Tweets and Stories")).toBe(true);
        expect(wrapper.text().includes("Daily")).toBe(true);
        expect(wrapper.text().includes("Weekly")).toBe(true);
        expect(wrapper.text().includes("Periodically")).toBe(true);
        expect(wrapper.text().includes("Off")).toBe(true);
    });

    it("should change Daily radio button", () => {
        testChangeRadioButton(0);
    });

    it("should change Weekly radio button", () => {
        testChangeRadioButton(1);
    });

    it("should change Off radio button", () => {
        testChangeRadioButton(3);
    });

    const testChangeRadioButton = (itemIndex: number): void => {
        const wrapper = mountWithStore(<EmailNotifications />, createMockRootState());
        expect(wrapper.find(Radio).at(itemIndex).prop("checked")).toBe(false);
        wrapper.find(Radio).at(itemIndex).find("input").simulate("change");
        expect(wrapper.find(Radio).at(itemIndex).prop("checked")).toBe(true);
    };
});
