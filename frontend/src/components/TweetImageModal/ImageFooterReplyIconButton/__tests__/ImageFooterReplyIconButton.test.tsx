import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ImageFooterReplyIconButton from "../ImageFooterReplyIconButton";

describe("ImageFooterReplyIconButton", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ImageFooterReplyIconButton />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("#replyIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes("2")).toBe(true);
    });
});
