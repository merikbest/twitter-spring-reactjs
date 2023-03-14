import React from "react";

import { mountWithStore } from "../../../../../util/test-utils/test-helper";
import ConversationHeader from "../ConversationHeader";

describe("ConversationHeader", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ConversationHeader />);
        expect(wrapper.text().includes("Conversation info")).toBe(true);
    });
});
