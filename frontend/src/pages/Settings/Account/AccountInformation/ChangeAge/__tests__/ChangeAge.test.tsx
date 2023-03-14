import React from "react";

import ChangeAge from "../ChangeAge";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";

describe("ChangeAge", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ChangeAge />, createMockRootState());
        expect(wrapper.text().includes("13-64")).toBe(true);
        expect(wrapper.text().includes("Not right? You can add your date of birth to your profile without sharing it publicly.")).toBe(true);
    });
});
