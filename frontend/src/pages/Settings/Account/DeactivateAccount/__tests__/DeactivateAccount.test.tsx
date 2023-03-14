import React from "react";
import { Avatar } from "@material-ui/core";
import { Link as MuiLink, Link } from "react-router-dom";
import { createMemoryHistory } from "history";

import DeactivateAccount from "../DeactivateAccount";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { PROFILE, SETTINGS_INFO } from "../../../../../constants/path-constants";
import { LoadingStatus } from "../../../../../types/common";

describe("DeactivateAccount", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<DeactivateAccount />, mockStore);

        expect(wrapper.find(Avatar).prop("src")).toBe(mockStore.user.data?.avatar);
        expect(wrapper.text().includes(mockStore.user.data?.username!)).toBe(true);
        expect(wrapper.text().includes(mockStore.user.data?.fullName!)).toBe(true);
        expect(wrapper.text().includes("This will deactivate your account")).toBe(true);
    });

    it("should route to user profile page", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<DeactivateAccount />, mockStore, history);

        wrapper.find(Link).at(0).simulate("click", { button: 0 });

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${PROFILE}/${mockStore.user.data?.id}`);
    });

    it("should route to settings info page", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<DeactivateAccount />, mockStore, history);

        wrapper.find(MuiLink).at(1).simulate("click", { button: 0 });

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(SETTINGS_INFO);
    });
});
