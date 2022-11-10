import React from "react";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types/common";
import EmptyPageDescription from "../EmptyPageDescription";

describe("EmptyPageDescription", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly Edit Profile Modal", () => {
        const wrapper = mountWithStore(<EmptyPageDescription title={"Title"} subtitle={"Subtitle"}/>, mockRootState);
        expect(wrapper.text().includes("Title")).toBe(true);
        expect(wrapper.text().includes("Subtitle")).toBe(true);
    });
});
