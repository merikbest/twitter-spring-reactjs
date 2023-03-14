import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import MessageSettings from "../MessageSettings";

describe("MessageSettings", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<MessageSettings />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.text().includes("Direct Messages")).toBe(true);
    });
});
