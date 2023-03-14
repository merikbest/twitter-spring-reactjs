import React from "react";
import { Button, IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import EditListButton from "../EditListButton";
import EditListModal from "../EditListModal/EditListModal";
import CloseButton from "../../../../components/CloseButton/CloseButton";

describe("EditListButton", () => {
    it("should open/close EditListModal", () => {
        const wrapper = mountWithStore(<EditListButton />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(EditListModal).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(EditListModal).prop("visible")).toBe(true);
        wrapper.find(EditListModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(EditListModal).prop("visible")).toBe(false);
    });
});
