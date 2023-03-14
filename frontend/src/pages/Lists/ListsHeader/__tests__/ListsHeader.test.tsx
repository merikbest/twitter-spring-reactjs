import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ListsHeader from "../ListsHeader";
import ActionIconButton from "../../../../components/ActionIconButton/ActionIconButton";
import { ClickAwayListener, IconButton } from "@material-ui/core";
import CreateListsModal from "../CreateListsModal/CreateListsModal";
import CloseButton from "../../../../components/CloseButton/CloseButton";

describe("ListsHeader", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should open/close Popover", () => {
        const wrapper = mountWithStore(<ListsHeader />, mockStore);
        wrapper.find(ActionIconButton).at(2).find(IconButton).simulate("click");
        expect(wrapper.text().includes("Lists you’re on")).toBe(true);
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());
        expect(wrapper.text().includes("Lists you’re on")).toBe(false);
    });

    it("should open/close CreateListsModal", () => {
        const wrapper = mountWithStore(<ListsHeader />, mockStore);
        expect(wrapper.find(CreateListsModal).prop("visible")).toBe(false);
        wrapper.find(ActionIconButton).at(1).find(IconButton).simulate("click");
        expect(wrapper.find(CreateListsModal).prop("visible")).toBe(true);
        wrapper.find(CreateListsModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(CreateListsModal).prop("visible")).toBe(false);
    });
});
