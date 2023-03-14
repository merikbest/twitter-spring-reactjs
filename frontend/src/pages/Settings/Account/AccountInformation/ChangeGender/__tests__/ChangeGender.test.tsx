import React from "react";
import { Button, Radio } from "@material-ui/core";

import ChangeGender from "../ChangeGender";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { UserActionsType } from "../../../../../../store/ducks/user/contracts/actionTypes";
import { ChangeInfoTextField } from "../../../../ChangeInfoTextField/ChangeInfoTextField";
import { LoadingStatus } from "../../../../../../types/common";

describe("ChangeGender", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ChangeGender />, mockStore);

        expect(wrapper.text().includes("Female")).toBe(true);
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(true);
        expect(wrapper.text().includes("Male")).toBe(true);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(false);
        expect(wrapper.text().includes("Other")).toBe(true);
        expect(wrapper.find(Radio).at(2).prop("checked")).toBe(false);
    });

    it("should render Male gender", () => {
        const mockMaleGender = {
            ...mockStore,
            user: { ...mockStore.user, data: { ...mockStore.user.data, gender: "Male" } }
        };
        const wrapper = mountWithStore(<ChangeGender />, mockMaleGender);

        expect(wrapper.text().includes("Female")).toBe(true);
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(false);
        expect(wrapper.text().includes("Male")).toBe(true);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(true);
    });

    it("should render Female gender", () => {
        const mockFemaleGender = {
            ...mockStore,
            user: { ...mockStore.user, data: { ...mockStore.user.data, gender: "Female" } }
        };
        const wrapper = mountWithStore(<ChangeGender />, mockFemaleGender);

        expect(wrapper.text().includes("Female")).toBe(true);
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(true);
        expect(wrapper.text().includes("Male")).toBe(true);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(false);
    });


    it("should render Other gender", () => {
        const mockFemaleGender = {
            ...mockStore,
            user: { ...mockStore.user, data: { ...mockStore.user.data, gender: undefined } }
        };
        const wrapper = mountWithStore(<ChangeGender />, mockFemaleGender);

        expect(wrapper.text().includes("Female")).toBe(true);
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(true);
        expect(wrapper.text().includes("Male")).toBe(true);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(false);
    });

    it("should change gender", () => {
        const wrapper = mountWithStore(<ChangeGender />, mockStore);

        expect(wrapper.text().includes("Female")).toBe(true);
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(true);
        expect(wrapper.text().includes("Male")).toBe(true);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(false);

        wrapper.find(Radio).at(1).find("input").simulate("change");

        expect(wrapper.text().includes("Female")).toBe(true);
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(false);
        expect(wrapper.text().includes("Male")).toBe(true);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(true);

        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { gender: "Male" },
            type: UserActionsType.UPDATE_GENDER
        });
    });

    it("should change other gender", () => {
        const wrapper = mountWithStore(<ChangeGender />, mockStore);

        expect(wrapper.find(ChangeInfoTextField).exists()).toBeFalsy();

        wrapper.find(Radio).at(2).find("input").simulate("change");

        expect(wrapper.find(ChangeInfoTextField).exists()).toBeTruthy();
        expect(wrapper.find(ChangeInfoTextField).prop("value")).toBe(mockStore.user.data?.gender);

        wrapper.find(ChangeInfoTextField).at(0).find("input").simulate("change", { target: { value: "test" } });
        expect(wrapper.find(ChangeInfoTextField).prop("value")).toBe("test");

        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { gender: "test" },
            type: UserActionsType.UPDATE_GENDER
        });
    });

    it("should reset ChangeGender", () => {
        const wrapper = mountWithStore(<ChangeGender />, mockStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: LoadingStatus.NEVER,
            type: UserActionsType.SET_USER_LOADING_STATE
        });
    });
});
