import React from "react";
import { Checkbox } from "@material-ui/core";

import AudienceAndTagging from "../AudienceAndTagging";
import {
    createMockRootState,
    mockDispatch,
    mountWithStore,
    testClickOnLink
} from "../../../../../util/test-utils/test-helper";
import { SETTINGS_PRIVACY_AND_SAFETY_TAGGING } from "../../../../../constants/path-constants";
import { UserActionsType } from "../../../../../store/ducks/user/contracts/actionTypes";
import { LoadingStatus } from "../../../../../types/common";

describe("AudienceAndTagging", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AudienceAndTagging />, mockStore);

        expect(wrapper.text().includes("Manage what information you allow other people on Twitter to see.")).toBe(true);
        expect(wrapper.text().includes("Protect your Tweets")).toBe(true);
        expect(wrapper.text().includes("Photo tagging")).toBe(true);
        expect(wrapper.text().includes("Anyone can tag you")).toBe(true);
        expect(wrapper.find(Checkbox).prop("checked")).toBe(false);
    });

    it("should render checked Checkbox", () => {
        const wrapper = mountWithStore(<AudienceAndTagging />, {
            ...mockStore,
            user: { ...mockStore.user, data: { ...mockStore.user.data, isPrivateProfile: true } }
        });
        expect(wrapper.find(Checkbox).prop("checked")).toBe(true);
    });

    it("should click Checkbox", () => {
        const wrapper = mountWithStore(<AudienceAndTagging />, mockStore);
        expect(wrapper.find(Checkbox).prop("checked")).toBe(false);

        wrapper.find(Checkbox).find("input").simulate("change", { target: { checked: true } });

        expect(wrapper.find(Checkbox).prop("checked")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { privateProfile: true },
            type: UserActionsType.UPDATE_PRIVATE_PROFILE
        });
    });

    it("should navigate to Photo tagging", () => {
        testClickOnLink(<AudienceAndTagging />, SETTINGS_PRIVACY_AND_SAFETY_TAGGING, 0);
    });

    it("should reset AudienceAndTagging", () => {
        const wrapper = mountWithStore(<AudienceAndTagging />, mockStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: LoadingStatus.NEVER,
            type: UserActionsType.SET_USER_LOADING_STATE
        });
    });
});
