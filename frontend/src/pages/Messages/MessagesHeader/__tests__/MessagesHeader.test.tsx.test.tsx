import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import MessagesHeader from "../MessagesHeader";

describe("MessagesHeader", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<MessagesHeader />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.text().includes("Messages")).toBe(true);
    });
});
