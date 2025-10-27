import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectErrorMessage,
    selectRegistrationInfo,
    selectRegistrationStep4
} from "../../../store/ducks/authentication/selector";
import { fetchCheckRegistrationCode } from "../../../store/ducks/authentication/actionCreators";

export const useEmailVerificationModal = () => {
    const dispatch = useDispatch();
    const registrationInfo = useSelector(selectRegistrationInfo);
    const registrationStep4 = useSelector(selectRegistrationStep4);
    const errorMessage = useSelector(selectErrorMessage);
    const [verificationCode, setVerificationCode] = useState("");

    const checkEmailVerificationCode = (): void => {
        dispatch(fetchCheckRegistrationCode(verificationCode));
    };

    const onChangeVerificationCode = (event: ChangeEvent<HTMLInputElement>): void => {
        setVerificationCode(event.target.value);
    };

    return {
        registrationInfo,
        registrationStep4,
        errorMessage,
        verificationCode,
        checkEmailVerificationCode,
        onChangeVerificationCode
    };
};
