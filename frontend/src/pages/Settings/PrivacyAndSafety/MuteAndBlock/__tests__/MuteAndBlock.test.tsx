import React from "react";

import MuteAndBlock from "../MuteAndBlock";
import {
    createMockRootState,
    mockDispatch,
    mountWithStore,
    testClickOnLink
} from "../../../../../util/test-utils/test-helper";
import {
    SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS,
    SETTINGS_PRIVACY_AND_SAFETY_BLOCKED,
    SETTINGS_PRIVACY_AND_SAFETY_MUTED,
    SETTINGS_PRIVACY_AND_SAFETY_MUTED_KEYWORDS
} from "../../../../../constants/path-constants";
import { UsersActionsType } from "../../../../../store/ducks/users/contracts/actionTypes";

describe("MuteAndBlock", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<MuteAndBlock />, createMockRootState());

        expect(wrapper.text().includes("Manage the accounts, words, and notifications that you’ve muted or blocked.")).toBe(true);
        expect(wrapper.text().includes("Blocked accounts")).toBe(true);
        expect(wrapper.text().includes("Muted accounts")).toBe(true);
        expect(wrapper.text().includes("Muted words")).toBe(true);
        expect(wrapper.text().includes("Muted notifications")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, { payload: [], type: UsersActionsType.SET_USERS });
    });

    it("should link to Blocked accounts", () => {
        testClickOnLink(<MuteAndBlock />, SETTINGS_PRIVACY_AND_SAFETY_BLOCKED, 0);
    });

    it("should link to Muted accounts", () => {
        testClickOnLink(<MuteAndBlock />, SETTINGS_PRIVACY_AND_SAFETY_MUTED, 1);
    });

    it("should link to Muted words", () => {
        testClickOnLink(<MuteAndBlock />, SETTINGS_PRIVACY_AND_SAFETY_MUTED_KEYWORDS, 2);
    });

    it("should link to Muted notifications", () => {
        testClickOnLink(<MuteAndBlock />, SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS, 3);
    });
});
