import React from "react";

import { mountWithStore } from "../../../../util/test-utils/test-helper";
import SendViaDirectMessageButton from "../SendViaDirectMessageButton";

describe("SendViaDirectMessageButton", () => {
    it("should render correctly", () => {
        const mockClick = jest.fn();
        const wrapper = mountWithStore(<SendViaDirectMessageButton onClickSendViaDirectMessage={mockClick} />);
        wrapper.find("#clickSendViaDirectMessage").at(0).simulate("click");
        expect(wrapper.text().includes("Send via Direct Message")).toBe(true);
        expect(mockClick).toHaveBeenCalled();
    });
});
