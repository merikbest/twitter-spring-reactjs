import React from "react";

import ChangeCountry from "../ChangeCountry";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { FilledSelect } from "../../../../../../components/FilledSelect/FilledSelect";
import { UserActionsType } from "../../../../../../store/ducks/user/contracts/actionTypes";
import { LoadingStatus } from "../../../../../../types/common";

describe("ChangeCountry", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly and select country", () => {
        const wrapper = mountWithStore(<ChangeCountry />, mockStore);

        expect(wrapper.text().includes("Country")).toBe(true);
        expect(wrapper.find(FilledSelect).prop("value")).toBe("UA");

        wrapper.find(FilledSelect).find("select").simulate("change", { target: { value: "US" } });

        expect(wrapper.find(FilledSelect).prop("value")).toBe("US");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { country: "US" }, type: UserActionsType.UPDATE_COUNTRY });
    });

    it("should reset state", () => {
        const wrapper = mountWithStore(<ChangeCountry />, mockStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: LoadingStatus.NEVER,
            type: UserActionsType.SET_USER_LOADING_STATE
        });
    });
});
