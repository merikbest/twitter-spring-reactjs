import React from "react";
import { Button } from "@material-ui/core";

import ChangeUsername from "../ChangeUsername";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { ChangeInfoTextField } from "../../../../ChangeInfoTextField/ChangeInfoTextField";
import { UserActionsType } from "../../../../../../store/ducks/user/contracts/actionTypes";
import { LoadingStatus } from "../../../../../../types/common";

describe("ChangeUsername", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render isLoading", () => {
        const wrapper = mountWithStore(<ChangeUsername />, createMockRootState());

        expect(wrapper.find(ChangeInfoTextField).prop("disabled")).toBe(true);
        expect(wrapper.find(Button).prop("disabled")).toBe(true);
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ChangeUsername />, mockStore);

        expect(wrapper.find(ChangeInfoTextField).prop("value")).toBe("Cat");
        expect(wrapper.text().includes("Suggestions")).toBe(true);
        expect(wrapper.text().includes(`${mockStore.user.data?.username}123`)).toBe(true);
    });

    it("should change username", () => {
        const wrapper = mountWithStore(<ChangeUsername />, mockStore);

        wrapper.find(ChangeInfoTextField).find("input").simulate("change", { target: { value: "test" } });
        wrapper.find(Button).simulate("click");

        expect(wrapper.find(ChangeInfoTextField).prop("value")).toBe("test");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { username: "test" },
            type: UserActionsType.UPDATE_USERNAME
        });
    });

    it("should change suggested username", () => {
        const wrapper = mountWithStore(<ChangeUsername />, mockStore);

        wrapper.find("#suggestedUsername").at(0).simulate("click");
        expect(wrapper.find(ChangeInfoTextField).prop("value")).toBe(`${mockStore.user.data?.username}123`);
    });
});
