import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import BlockUserComponent from "../BlockUserComponent";

describe("BlockUserComponent", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render Unblock user", () => {
        testBlockUserComponent(true, "Unblock");
    });

    it("should render Block user", () => {
        testBlockUserComponent(false, "Block");
    });

    const testBlockUserComponent = (isUserBlocked: boolean, mockText: string): void => {
        const wrapper = mountWithStore(
            <BlockUserComponent
                onOpenBlockUserModal={jest.fn()}
                username={"test_name"}
                isUserBlocked={isUserBlocked}
            />, mockRootState);
        expect(wrapper.text().includes(`${mockText}  @test_name`)).toBe(true);
    };
});
