import { testCall, testLoadingStatus, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { AuthenticationTypes } from "../constants/actionTypes";
import {
    authenticationSaga,
    fetchCheckRegistrationCodeRequest,
    fetchRegistrationRequest,
    fetchSendRegistrationCodeRequest
} from "../sagas";
import {
    fetchCheckRegistrationCode,
    fetchRegistration,
    fetchSendRegistrationCode,
    setErrorMessage,
    setLoadingAuthState,
    setRegistrationInfo,
    setRegistrationStep
} from "../actionCreators";
import { RegistrationApi } from "../../../../services/api/user-service/registrationApi";
import { RegistrationStep } from "../../../../types/auth";

describe("authenticationSaga:", () => {
    const mockRegistrationInfo = { username: "test", email: "test@test.test", birthday: "" };

    describe("fetchRegistrationRequest:", () => {
        const mockRegistrationPayload = { registrationData: mockRegistrationInfo, setError: jest.fn() };
        const worker = fetchRegistrationRequest(fetchRegistration(mockRegistrationPayload));
        testLoadingStatus(worker, setLoadingAuthState, LoadingStatus.LOADING);
        testCall(worker, RegistrationApi.registration, mockRegistrationInfo);
        testLoadingStatus(worker, setRegistrationInfo, mockRegistrationInfo);
        testLoadingStatus(worker, setRegistrationStep, RegistrationStep.STEP_2);
        testLoadingStatus(worker, setLoadingAuthState, LoadingStatus.LOADED);
        testLoadingStatus(worker, setLoadingAuthState, LoadingStatus.ERROR);
    });

    describe("fetchSendRegistrationCodeRequest:", () => {
        const worker = fetchSendRegistrationCodeRequest(fetchSendRegistrationCode(mockRegistrationInfo));
        testLoadingStatus(worker, setLoadingAuthState, LoadingStatus.LOADING);
        testCall(worker, RegistrationApi.sendRegistrationCode, mockRegistrationInfo);
        testLoadingStatus(worker, setRegistrationStep, RegistrationStep.STEP_4);
        testLoadingStatus(worker, setLoadingAuthState, LoadingStatus.LOADED);
        testLoadingStatus(worker, setLoadingAuthState, LoadingStatus.ERROR);
    });

    describe("fetchCheckRegistrationCodeRequest:", () => {
        const worker = fetchCheckRegistrationCodeRequest(fetchCheckRegistrationCode("test"));
        testLoadingStatus(worker, setErrorMessage, null);
        testLoadingStatus(worker, setLoadingAuthState, LoadingStatus.LOADING);
        testCall(worker, RegistrationApi.checkRegistrationCode, "test");
        testLoadingStatus(worker, setRegistrationStep, RegistrationStep.STEP_5);
        testLoadingStatus(worker, setLoadingAuthState, LoadingStatus.LOADED);
        testLoadingStatus(worker, setLoadingAuthState, LoadingStatus.ERROR);
    });

    testWatchSaga(authenticationSaga, [
        { actionType: AuthenticationTypes.FETCH_REGISTRATION, workSaga: fetchRegistrationRequest },
        { actionType: AuthenticationTypes.FETCH_SEND_REGISTRATION_CODE, workSaga: fetchSendRegistrationCodeRequest },
        { actionType: AuthenticationTypes.FETCH_CHECK_REGISTRATION_CODE, workSaga: fetchCheckRegistrationCodeRequest }
    ]);
});
