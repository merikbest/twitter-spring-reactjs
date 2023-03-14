import React from "react";
import { Dialog } from "@material-ui/core";

import { mountWithStore } from "../../../../../util/test-utils/test-helper";
import LeaveFromConversationModal from "../LeaveFromConversationModal";

describe("LeaveFromConversationModal", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <LeaveFromConversationModal
                handleLeaveFromConversation={jest.fn()}
                onClose={jest.fn()}
                visible
            />);
        expect(wrapper.text().includes("Leave conversation?")).toBe(true);
        expect(wrapper.text().includes("This conversation will be deleted from your inbox.")).toBe(true);
    });

    it("should render empty Dialog", () => {
        const wrapper = mountWithStore(
            <LeaveFromConversationModal
                handleLeaveFromConversation={jest.fn()}
                onClose={jest.fn()}
                visible={false}
            />);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
