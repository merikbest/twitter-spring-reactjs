import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import ShareActionsItem from "../ShareActionsItem";
import { ShareIcon } from "../../../../../icons";

describe("ShareActionsItem", () => {
    it("should render ShareActionsItem correctly", () => {
        const wrapper = mountWithStore(
            <ShareActionsItem icon={ShareIcon} title={"Share List"} />,
            createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.text().includes("Share List")).toBe(true);
        expect(wrapper.find("#shareIcon").exists()).toBeTruthy();
    });
});
