import React from "react";
import { createMemoryHistory } from "history";
import { Button } from "@material-ui/core";

import Login from "../Login";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { LoginTextField } from "../LoginInputField";
import { UserActionsType } from "../../../store/ducks/user/contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";

describe("Login", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Login />, mockStore);

        expect(wrapper.text().includes("Log in to Twitter")).toBe(true);
        expect(wrapper.find(Button).text().includes("Login")).toBe(true);
        expect(wrapper.text().includes("Forgot password?")).toBe(true);
        expect(wrapper.text().includes("Sign up for Twitter")).toBe(true);
    });

    it("should submit Login form", () => {
        const history = createMemoryHistory();
        const mockEmail = "testemail@test.test";
        const mockPassword = "testpassword";
        const wrapper = mountWithStore(<Login />, mockStore, history);
        const inputEmail = wrapper.find(LoginTextField).at(0).find("input").at(0);
        const inputPassword = wrapper.find(LoginTextField).at(1).find("input").at(0);

        inputEmail.simulate("change", { target: { value: mockEmail } });
        inputPassword.simulate("change", { target: { value: mockPassword } });
        wrapper.find(Button).at(0).simulate("submit");

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {
                email: mockEmail,
                password: mockPassword,
                history: history
            }, type: UserActionsType.FETCH_SIGN_IN
        });
    });

    it("should render error", () => {
        const wrapper = mountWithStore(<Login />, createMockRootState(LoadingStatus.ERROR));

        expect(wrapper.text().includes("The username and password you entered did not match our records. " +
            "Please double-check and try again.")).toBe(true);
    });

    it("should component unmount", () => {
        const wrapper = mountWithStore(<Login />, mockStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: LoadingStatus.LOADING,
            type: UserActionsType.SET_USER_LOADING_STATE
        });
    });
});
