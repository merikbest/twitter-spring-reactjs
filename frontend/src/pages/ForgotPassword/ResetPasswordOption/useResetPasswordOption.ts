import { FormEvent, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { ACCOUNT_FORGOT_CONFIRM_PIN_RESET } from "../../../constants/path-constants";
import { AuthenticationApi } from "../../../services/api/user-service/authenticationApi";

export const useResetPasswordOption = () => {
    const history = useHistory();
    const location = useLocation<{ email: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendResetCode = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setIsLoading(true);
        AuthenticationApi.sendPasswordResetCode({ email: location.state.email })
            .then(() => {
                history.push(ACCOUNT_FORGOT_CONFIRM_PIN_RESET);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    };

    return {
        email: location.state.email,
        isLoading,
        sendResetCode
    };
};
