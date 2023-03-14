import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { mockMyProfile } from "../../../../../util/test-utils/mock-test-data";
import AddUserToListsButton from "../AddUserToListsButton";
import CloseButton from "../../../../../components/CloseButton/CloseButton";
import ListsModal from "../../../../../components/ListsModal/ListsModal";

describe("AddUserToListsButton", () => {
    it("should open/close ListsModal", () => {
        const wrapper = mountWithStore(<AddUserToListsButton />, createMockRootState());
        expect(wrapper.text().includes(`Add/remove @${mockMyProfile.username} from Lists`)).toBe(true);
        expect(wrapper.find(ListsModal).prop("visible")).toBe(false);
        wrapper.find("#openListsModal").at(0).simulate("click");
        expect(wrapper.find(ListsModal).prop("visible")).toBe(true);
        wrapper.find(ListsModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(ListsModal).prop("visible")).toBe(false);
    });
});
