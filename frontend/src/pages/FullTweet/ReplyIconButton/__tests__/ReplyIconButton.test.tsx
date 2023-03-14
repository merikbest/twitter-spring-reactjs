import React from "react";

import { mountWithStore } from "../../../../util/test-utils/test-helper";
import ActionIconButton from "../../../../components/ActionIconButton/ActionIconButton";
import { ReplyIcon } from "../../../../icons";
import ReplyIconButton from "../ReplyIconButton";

describe("ReplyIconButton", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ReplyIconButton />);
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Reply");
        expect(wrapper.find(ActionIconButton).prop("icon")).toBe(ReplyIcon);
    });
});
