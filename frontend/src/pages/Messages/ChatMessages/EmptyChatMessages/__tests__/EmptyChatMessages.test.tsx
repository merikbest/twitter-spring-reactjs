import React from "react";
import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import EmptyChatMessages from "../EmptyChatMesseges";

describe("EmptyChatMessages", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<EmptyChatMessages />, mockRootState);
        expect(wrapper.text().includes("You don’t have a message selected")).toBe(true);
        expect(wrapper.text().includes("Choose one from your existing messages, or start a new one.")).toBe(true);
    });
});
