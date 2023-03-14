import React from "react";
import { Tab } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../types/common";
import UnsentTweetsTab from "../UnsentTweetsTab";

describe("UnsentTweetsTab", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <UnsentTweetsTab activeTab={0} handleChangeTab={jest.fn()} />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(Tab).at(0).prop("label")).toBe("Scheduled");
        expect(wrapper.find(Tab).at(1).prop("label")).toBe("Drafts");
    });
});
