import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import MessageSettings from "../MessageSettings";

describe("MessageSettings", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<MessageSettings/>, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.text().includes("Direct Messages")).toBe(true);
    });
});
