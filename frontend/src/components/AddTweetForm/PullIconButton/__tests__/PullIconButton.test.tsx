import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import PullIconButton from "../PullIconButton";

describe("PullIconButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render disabled button", () => {
        const wrapper = mountWithStore(
            <PullIconButton
                buttonName={"Add"}
                onOpenPoll={jest.fn()}
                disabled />,
            mockRootState);
        expect(wrapper.find(ActionIconButton).prop("disabled")).toBe(true);
    });

    it("should render empty button", () => {
        const wrapper = mountWithStore(
            <PullIconButton
                buttonName={"Reply"}
                onOpenPoll={jest.fn()}
                disabled={false} />,
            mockRootState);
        expect(wrapper.find(ActionIconButton).exists()).toBeFalsy();
    });
});
