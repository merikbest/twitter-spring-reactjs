import React from "react";

import { mountWithStore } from "../../../util/test-utils/test-helper";
import LockIcon from "../LockIcon";

describe("LockIcon", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<LockIcon />);
        expect(wrapper.find("#lockIcon").exists()).toBe(true);
    });
});
