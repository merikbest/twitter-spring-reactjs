import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../../../util/test-utils/test-helper";
import ExploreModalInfo from "../ExploreModalInfo";
import { LoadingStatus } from "../../../../../../../types/common";

describe("ExploreModalInfo", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render ExploreModalInfo with searchModalTitle", () => {
        const wrapper = mountWithStore(
            <ExploreModalInfo
                isSearchModal={false}
                searchModalTitle={"Location"}
                title={"Show content in this location"}
                subtitle={"When this is on, you’ll see what’s happening around you right now."}
            />, mockStore);
        expect(wrapper.text().includes("Location")).toBe(true);
        expect(wrapper.text().includes("Show content in this location")).toBe(true);
        expect(wrapper.text().includes("When this is on, you’ll see what’s happening around you right now.")).toBe(true);
    });

    it("should render ExploreModalInfo without searchModalTitle", () => {
        const wrapper = mountWithStore(
            <ExploreModalInfo
                isSearchModal={true}
                searchModalTitle={"Location"}
                title={"Show content in this location"}
                subtitle={"When this is on, you’ll see what’s happening around you right now."}
            />, mockStore);
        expect(wrapper.text().includes("Location")).toBe(false);
        expect(wrapper.text().includes("Show content in this location")).toBe(true);
        expect(wrapper.text().includes("When this is on, you’ll see what’s happening around you right now.")).toBe(true);
    });
});
