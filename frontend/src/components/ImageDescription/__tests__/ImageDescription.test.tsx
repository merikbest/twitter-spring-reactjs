import React from "react";
import { Popover } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../types/common";
import ImageDescription from "../ImageDescription";

describe("ImageDescription", () => {

    it("should click open and close ImageDescription", () => {
        const wrapper = mountWithStore(
            <ImageDescription imageDescription={"test"} />,
            createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(Popover).prop("open")).toBe(false);
        wrapper.find("#altImageDescription").at(0).simulate("click");
        expect(wrapper.find(Popover).prop("open")).toBe(true);
        expect(wrapper.text().includes("test")).toBe(true);
    });
});
