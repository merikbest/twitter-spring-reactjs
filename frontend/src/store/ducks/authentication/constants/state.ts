import { UseFormSetError } from "react-hook-form/dist/types/form";

import { RegistrationRequest, RegistrationStep } from "../../../../types/auth";
import { LoadingStatus } from "../../../../types/common";
import { RegistrationFormProps } from "../../../../pages/Authentication/RegistrationModal/RegistrationModal";

export interface AuthenticationState {
    registrationInfo: RegistrationRequest;
    registrationStep: RegistrationStep | null;
    errorMessage: string | null;
    loadingState: LoadingStatus;
}


export interface RegistrationPayload {
    registrationData: RegistrationRequest;
    setError: UseFormSetError<RegistrationFormProps>;
}
