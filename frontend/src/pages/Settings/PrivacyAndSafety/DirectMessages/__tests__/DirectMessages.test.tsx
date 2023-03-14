import React from "react";
import { Checkbox, Link as MuiLink } from "@material-ui/core";

import DirectMessages from "../DirectMessages";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import {
    DIRECT_MESSAGES,
    DIRECT_MESSAGES_RECEIPTS,
    DIRECT_MESSAGES_RECEIVE
} from "../../../../../constants/url-constants";
import { UserActionsType } from "../../../../../store/ducks/user/contracts/actionTypes";
import { LoadingStatus } from "../../../../../types/common";

describe("DirectMessages", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<DirectMessages />, mockStore);

        expect(wrapper.text().includes("Manage who can message you directly.")).toBe(true);
        expect(wrapper.text().includes("Allow message requests from everyone")).toBe(true);
        expect(wrapper.text().includes("Filter low-quality messages")).toBe(true);
        expect(wrapper.text().includes("Show read receipts")).toBe(true);
        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(false);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(DIRECT_MESSAGES_RECEIVE);
        expect(wrapper.find(MuiLink).at(1).prop("href")).toBe(DIRECT_MESSAGES);
        expect(wrapper.find(MuiLink).at(2).prop("href")).toBe(DIRECT_MESSAGES_RECEIPTS);
    });

    it("should click Checkbox", () => {
        const wrapper = mountWithStore(<DirectMessages />, mockStore);
        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(false);

        wrapper.find(Checkbox).find("input").at(0).simulate("change", { target: { checked: true } });

        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { mutedDirectMessages: true },
            type: UserActionsType.UPDATE_DIRECT
        });
    });

    it("should render checked Checkbox", () => {
        const wrapper = mountWithStore(<DirectMessages />, {
            ...mockStore,
            user: { ...mockStore.user, data: { ...mockStore.user.data, isMutedDirectMessages: true } }
        });
        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(true);
    });

    it("should reset DirectMessages", () => {
        const wrapper = mountWithStore(<DirectMessages />, mockStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: LoadingStatus.NEVER,
            type: UserActionsType.SET_USER_LOADING_STATE
        });
    });
});
