import React from "react";

import { mountWithStore } from "../../../util/test-utils/test-helper";
import PageHeaderWrapper from "../PageHeaderWrapper";
import BackButton from "../../BackButton/BackButton";

describe("PageHeaderWrapper", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<PageHeaderWrapper children={<p>Children</p>} backButton />);
        expect(wrapper.find(BackButton).exists()).toBe(true);
        expect(wrapper.text().includes("Children")).toBe(true);
    });
});
