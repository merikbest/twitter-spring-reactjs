import React from "react";

import { mockFullList } from "../../../../util/test-utils/mock-test-data";
import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import FullListHeader from "../FullListHeader";

describe("FullListHeader", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const mockState = { ...mockRootState, list: { ...mockRootState.list, list: mockFullList } };
        const wrapper = mountWithStore(<FullListHeader />, mockState);
        expect(wrapper.text().includes(mockFullList.name)).toBe(true);
        expect(wrapper.text().includes(mockFullList.listOwner.username)).toBe(true);
    });

    it("should render private profile", () => {
        const mockState = {
            ...mockRootState,
            list: { ...mockRootState.list, list: { ...mockFullList, isPrivate: true } }
        };
        const wrapper = mountWithStore(<FullListHeader />, mockState);
        expect(wrapper.find("#lockIcon").exists()).toBeTruthy();
    });
});
