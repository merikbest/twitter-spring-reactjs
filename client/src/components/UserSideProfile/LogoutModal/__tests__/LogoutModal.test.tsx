import React from "react";
import {Button, Dialog} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import LogoutModal from "../LogoutModal";

describe("LogoutModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <LogoutModal
                visible={true}
                onClose={jest.fn()}
                handleSignOut={jest.fn()}
            />, mockRootState);
        expect(wrapper.text().includes("Log out of Twitter?")).toBe(true);
        expect(wrapper.text().includes("You can always log back in at any time.")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Cancel")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Log out")).toBe(true);
    });

    it("should render empty LogoutModal", () => {
        const wrapper = mountWithStore(
            <LogoutModal
                visible={false}
                onClose={jest.fn()}
                handleSignOut={jest.fn()}
            />, mockRootState);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
