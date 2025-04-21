import React from "react";
import { Dialog } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import SendViaDirectMessageButton from "../SendViaDirectMessageButton";
import { LoadingStatus } from "../../../../types/common";

describe("SendViaDirectMessageButton", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<SendViaDirectMessageButton tweetId={1} />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
        wrapper.find("#clickSendViaDirectMessage").at(0).simulate("click");
        expect(wrapper.text().includes("Send via Direct Message")).toBe(true);
        expect(wrapper.find(Dialog).exists()).toBeTruthy();
    });
});
