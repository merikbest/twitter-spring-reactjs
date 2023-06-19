import { authenticationReducer, initialAuthenticationState } from "../reducer";
import { AuthenticationActions, AuthenticationTypes } from "../constants/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { RegistrationStep } from "../../../../types/auth";
import { LoadingStatus } from "../../../../types/common";

describe("authenticationReducer:", () => {
    const mockRegistrationInfo = { username: "test", email: "test@test.test", birthday: "" };

    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(authenticationReducer(undefined, {} as AuthenticationActions)).toEqual(initialAuthenticationState);
        });
    });

    describe("authentication handlers:", () => {

        testActionDispatch(
            AuthenticationTypes.SET_REGISTRATION_INFO,
            authenticationReducer(initialAuthenticationState, {
                type: AuthenticationTypes.SET_REGISTRATION_INFO,
                payload: mockRegistrationInfo
            }),
            {
                ...initialAuthenticationState,
                registrationInfo: mockRegistrationInfo
            }
        );

        testActionDispatch(
            AuthenticationTypes.SET_REGISTRATION_STEP,
            authenticationReducer(initialAuthenticationState, {
                type: AuthenticationTypes.SET_REGISTRATION_STEP,
                payload: RegistrationStep.STEP_5
            }),
            {
                ...initialAuthenticationState,
                registrationStep: RegistrationStep.STEP_5
            }
        );

        testActionDispatch(
            AuthenticationTypes.SET_ERROR_MESSAGE,
            authenticationReducer(initialAuthenticationState, {
                type: AuthenticationTypes.SET_ERROR_MESSAGE,
                payload: "test_error"
            }),
            {
                ...initialAuthenticationState,
                errorMessage: "test_error"
            }
        );

        testActionDispatch(
            AuthenticationTypes.SET_OPEN_MODAL,
            authenticationReducer(initialAuthenticationState, {
                type: AuthenticationTypes.SET_OPEN_MODAL
            }),
            {
                ...initialAuthenticationState,
                registrationStep: RegistrationStep.STEP_1
            }
        );

        testActionDispatch(
            AuthenticationTypes.SET_CLOSE_MODAL,
            authenticationReducer(initialAuthenticationState, {
                type: AuthenticationTypes.SET_CLOSE_MODAL
            }),
            { ...initialAuthenticationState }
        );

        testActionDispatch(
            AuthenticationTypes.SET_LOADING_STATE,
            authenticationReducer(initialAuthenticationState, {
                type: AuthenticationTypes.SET_LOADING_STATE,
                payload: LoadingStatus.LOADED
            }),
            {
                ...initialAuthenticationState,
                loadingState: LoadingStatus.LOADED
            }
        );
    });
});
