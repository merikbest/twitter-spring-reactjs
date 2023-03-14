import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import CloseButton from "../../../CloseButton/CloseButton";
import AddToListButton from "../AddToListButton";
import ListsModal from "../../../ListsModal/ListsModal";

describe("AddToListButton", () => {
    it("should click open/close ListsModal", () => {
        const wrapper = mountWithStore(
            <AddToListButton
                userId={1}
                username={"test_name"}
            />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(ListsModal).prop("visible")).toBe(false);
        wrapper.find("#openListsModal").at(0).simulate("click");
        expect(wrapper.find(ListsModal).prop("visible")).toBe(true);
        wrapper.find(ListsModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(ListsModal).prop("visible")).toBe(false);
    });
});
