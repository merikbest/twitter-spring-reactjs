import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectIsLoading,
    selectRegistrationInfo,
    selectRegistrationStep3
} from "../../../store/ducks/authentication/selector";
import { fetchSendRegistrationCode } from "../../../store/ducks/authentication/actionCreators";

export const useCreateAccountModal = () => {
    const dispatch = useDispatch();
    const registrationInfo = useSelector(selectRegistrationInfo);
    const registrationStep3 = useSelector(selectRegistrationStep3);
    const isLoading = useSelector(selectIsLoading);

    const onSubmit = useCallback((): void => {
        dispatch(fetchSendRegistrationCode(registrationInfo));
    }, [dispatch, registrationInfo]);

    return { registrationInfo, registrationStep3, isLoading, onSubmit };
};
