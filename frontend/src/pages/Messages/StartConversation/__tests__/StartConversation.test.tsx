import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import StartConversation from "../StartConversation";

describe("StartConversation", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<StartConversation />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.text().includes("Send a message, get a message")).toBe(true);
        expect(wrapper.text().includes("Start a conversation")).toBe(true);
    });
});
