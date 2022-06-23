import React from "react";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import HoverAction from "../HoverAction";

describe("HoverAction", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render visible HoverAction", () => {
        const wrapper = mountWithStore(<HoverAction visible={true} positionTop={true} actionText={"Like"} />, mockRootState);

        expect(wrapper.find("div").exists()).toBeTruthy();
        expect(wrapper.find("#action-text").text().includes("Like")).toBe(true);
    });

    it("should render empty HoverAction", () => {
        const wrapper = mountWithStore(<HoverAction visible={false} positionTop={false} actionText={"Like"} />, mockRootState);

        expect(wrapper.find("div").exists()).toBeFalsy();
    });
});
