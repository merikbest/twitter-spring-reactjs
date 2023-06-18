import { testAction } from "../../../../util/test-utils/test-helper";
import {
    fetchCheckRegistrationCode,
    fetchRegistration,
    fetchSendRegistrationCode,
    setCloseModal,
    setErrorMessage,
    setLoadingAuthState,
    setOpenModal,
    setRegistrationInfo,
    setRegistrationStep
} from "../actionCreators";
import { AuthenticationTypes } from "../constants/actionTypes";
import { RegistrationRequest, RegistrationStep } from "../../../../types/auth";
import { RegistrationPayload } from "../constants/state";
import { LoadingStatus } from "../../../../types/common";

describe("authentication actions", () => {
    const mockRegistrationRequest = { username: "test" } as RegistrationRequest;

    testAction(setRegistrationInfo, setRegistrationInfo(mockRegistrationRequest), {
        type: AuthenticationTypes.SET_REGISTRATION_INFO,
        payload: mockRegistrationRequest
    });

    testAction(setRegistrationStep, setRegistrationStep(RegistrationStep.STEP_2), {
        type: AuthenticationTypes.SET_REGISTRATION_STEP,
        payload: RegistrationStep.STEP_2
    });

    testAction(setErrorMessage, setErrorMessage("test"), {
        type: AuthenticationTypes.SET_ERROR_MESSAGE,
        payload: "test"
    });

    testAction(fetchRegistration, fetchRegistration({ registrationData: mockRegistrationRequest } as RegistrationPayload), {
        type: AuthenticationTypes.FETCH_REGISTRATION,
        payload: { registrationData: mockRegistrationRequest } as RegistrationPayload
    });

    testAction(fetchSendRegistrationCode, fetchSendRegistrationCode(mockRegistrationRequest), {
        type: AuthenticationTypes.FETCH_SEND_REGISTRATION_CODE,
        payload: mockRegistrationRequest
    });

    testAction(fetchCheckRegistrationCode, fetchCheckRegistrationCode("test"), {
        type: AuthenticationTypes.FETCH_CHECK_REGISTRATION_CODE,
        payload: "test"
    });

    testAction(setOpenModal, setOpenModal(), {
        type: AuthenticationTypes.SET_OPEN_MODAL
    });

    testAction(setCloseModal, setCloseModal(), {
        type: AuthenticationTypes.SET_CLOSE_MODAL
    });

    testAction(setLoadingAuthState, setLoadingAuthState(LoadingStatus.LOADED), {
        type: AuthenticationTypes.SET_LOADING_STATE,
        payload: LoadingStatus.LOADED
    });
});
