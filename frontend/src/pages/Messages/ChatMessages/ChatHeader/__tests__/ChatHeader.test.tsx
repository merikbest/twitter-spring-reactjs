import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../store/types/common";
import {mockMyProfile} from "../../../../../util/mockData/mockData";
import ChatHeader from "../ChatHeader";

describe("ChatHeader", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ChatHeader/>, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(Avatar).prop("src")).toEqual(mockMyProfile.avatar.src);
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(mockMyProfile.username)).toBe(true);
    });
});
