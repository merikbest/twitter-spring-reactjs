import React from "react";
import { Radio } from "@material-ui/core";

import Autoplay from "../Autoplay";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../types/common";

describe("Autoplay", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly and toggle radio button", () => {
        const wrapper = mountWithStore(<Autoplay />, mockStore);

        expect(wrapper.text().includes("Autoplay")).toBe(true);
        expect(wrapper.text().includes("On cellular or Wi-Fi")).toBe(true);
        expect(wrapper.text().includes("Never")).toBe(true);
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(false);

        wrapper.find(Radio).at(0).find("input").simulate("change");
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(true);
    });
});
