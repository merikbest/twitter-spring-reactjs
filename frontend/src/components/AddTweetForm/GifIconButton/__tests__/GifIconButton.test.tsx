import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import GifIconButton from "../GifIconButton";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import CloseButton from "../../../CloseButton/CloseButton";
import GifModalWindow from "../GifModalWindow/GifModalWindow";

describe("GifIconButton", () => {
    it("should open and close modal window", () => {
        const wrapper = mountWithStore(<GifIconButton />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(GifModalWindow).prop("visible")).toBe(false);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.find(GifModalWindow).prop("visible")).toBe(true);
        wrapper.find(GifModalWindow).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(GifModalWindow).prop("visible")).toBe(false);
    });
});
