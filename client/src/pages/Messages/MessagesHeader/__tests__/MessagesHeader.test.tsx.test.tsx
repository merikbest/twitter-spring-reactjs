import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import MessagesHeader from "../MessagesHeader";

describe("MessagesHeader", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<MessagesHeader/>, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.text().includes("Messages")).toBe(true);
    });
});
