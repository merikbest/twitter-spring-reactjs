import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import Authentication from "../Authentication";
import { ACCOUNT_LOGIN } from "../../../constants/path-constants";
import { LoadingStatus } from "../../../types/common";
import { AuthenticationTypes } from "../../../store/ducks/authentication/constants/actionTypes";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

describe("Authentication", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockRegistrationData = { username: "test_username", email: "test@test.test", birthday: "Feb 31, 1901" };
    const mockRootStore = {
        ...mockStore,
        authentication: {
            ...mockStore.authentication,
            registrationInfo: mockRegistrationData
        }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Authentication />, mockRootStore);
        expect(wrapper.find(Button).at(0).text()).toEqual("Sign up");
        expect(wrapper.find(Button).at(1).text()).toEqual("Log in");
    });

    it("should render RegistrationModal on click Sign Up button", () => {
        const wrapper = mountWithStore(<Authentication />, mockRootStore);
        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { type: AuthenticationTypes.SET_OPEN_MODAL });
    });

    it("should route to Login page on click Log In button", () => {
        const wrapper = mountWithStore(<Authentication />, mockRootStore);
        wrapper.find(Button).at(1).simulate("click");
        expect(mockHistoryPush).toHaveBeenCalledWith(ACCOUNT_LOGIN);
    });
});
