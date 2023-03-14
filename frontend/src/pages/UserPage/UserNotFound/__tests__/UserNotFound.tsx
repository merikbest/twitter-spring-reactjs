import { Avatar } from "@material-ui/core";
import React from "react";

import BackButton from "../../../../components/BackButton/BackButton";
import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import UserNotFound from "../UserNotFound";

describe("UserNotFound", () => {

    it("should render UserNotFound", () => {
        const wrapper = mountWithStore(<UserNotFound />, createMockRootState());

        expect(wrapper.find(BackButton).exists()).toBeTruthy();
        expect(wrapper.find(Avatar).exists()).toBeTruthy();
        expect(wrapper.text().includes("Profile")).toBe(true);
        expect(wrapper.text().includes("This account doesn’t exist")).toBe(true);
        expect(wrapper.text().includes("Try searching for another.")).toBe(true);
    });
});
