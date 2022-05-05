import React from "react";

import AdsPreferences from "../AdsPreferences";
import {createMockRootState, mountWithStore, testClickOnLink} from "../../../../../util/testHelper";
import {SETTINGS_PRIVACY_AND_SAFETY_AUDIENCES} from "../../../../../util/pathConstants";

describe("AdsPreferences", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AdsPreferences/>, createMockRootState());

        expect(wrapper.text().includes("Control your discoverability settings and manage contacts you’ve imported.")).toBe(true);
        expect(wrapper.text().includes("Personalized ads")).toBe(true);
        expect(wrapper.text().includes("Interests")).toBe(true);
        expect(wrapper.text().includes("Your advertiser list")).toBe(true);
    });

    it("should navigate to Your advertiser list", () => {
        testClickOnLink(<AdsPreferences/>, SETTINGS_PRIVACY_AND_SAFETY_AUDIENCES, 0);
    });
});
