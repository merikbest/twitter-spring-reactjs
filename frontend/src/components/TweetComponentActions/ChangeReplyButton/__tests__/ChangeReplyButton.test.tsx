import React from "react";

import { mountWithStore } from "../../../../util/test-utils/test-helper";
import ChangeReplyButton from "../ChangeReplyButton";

describe("ChangeReplyButton", () => {
    it("should handle Click Reply Dropdown", () => {
        const mockHandleClickReplyDropdown = jest.fn();
        const wrapper = mountWithStore(<ChangeReplyButton handleClickReplyDropdown={mockHandleClickReplyDropdown} />);
        wrapper.find("#clickReplyDropdown").at(0).simulate("click");
        expect(mockHandleClickReplyDropdown).toHaveBeenCalled();
        expect(wrapper.text().includes("Change who can reply")).toBe(true);
    });
});
