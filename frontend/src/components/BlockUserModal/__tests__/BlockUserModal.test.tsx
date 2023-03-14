import React from "react";
import { Button, Dialog } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import BlockUserModal from "../BlockUserModal";
import { LoadingStatus } from "../../../types/common";

describe("BlockUserModal", () => {

    it("should render Block user", () => {
        const wrapper = initializeWrapper(true, false);

        expect(wrapper.text().includes("Block")).toBe(true);
        expect(wrapper.text().includes("They will not be able to follow you or view your Tweets, and you will not see Tweets or notifications from @John Doe.")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Block")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Cancel")).toBe(true);
    });

    it("should render Unblock user", () => {
        const wrapper = initializeWrapper(true);

        wrapper.find(Dialog).simulate("click");

        expect(wrapper.text().includes("Unblock")).toBe(true);
        expect(wrapper.text().includes("They will be able to follow you and view your Tweets.")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Unblock")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Cancel")).toBe(true);
    });

    it("should render empty BlockUserModal correctly", () => {
        const wrapper = initializeWrapper(false);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    const initializeWrapper = (isVisible: boolean, isUserBlocked = true) => {
        return mountWithStore(
            <BlockUserModal
                username={"John Doe"}
                isUserBlocked={isUserBlocked}
                visible={isVisible}
                onClose={jest.fn()}
                onBlockUser={jest.fn()}
            />, createMockRootState(LoadingStatus.LOADED));
    };
});
