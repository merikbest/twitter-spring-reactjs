import React from "react";
import { Button } from "@material-ui/core";

import ChangeLanguage from "../ChangeLanguage";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { FilledSelect } from "../../../../../../components/FilledSelect/FilledSelect";
import { UserActionsType } from "../../../../../../store/ducks/user/contracts/actionTypes";
import { LoadingStatus } from "../../../../../../types/common";

describe("ChangeLanguage", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly and change language", () => {
        const wrapper = mountWithStore(<ChangeLanguage />, mockStore);

        expect(wrapper.text().includes("Display Language")).toBe(true);
        expect(wrapper.find(FilledSelect).prop("value")).toBe(mockStore.user.data?.language);

        wrapper.find(FilledSelect).find("select").simulate("change", { target: { value: "English" } });
        wrapper.find(Button).simulate("click");

        expect(wrapper.find(FilledSelect).prop("value")).toBe("English");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { language: "English" },
            type: UserActionsType.UPDATE_LANGUAGE
        });
    });

    it("should reset ChangeLanguage", () => {
        const wrapper = mountWithStore(<ChangeLanguage />, mockStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: LoadingStatus.NEVER,
            type: UserActionsType.SET_USER_LOADING_STATE
        });
    });
});
