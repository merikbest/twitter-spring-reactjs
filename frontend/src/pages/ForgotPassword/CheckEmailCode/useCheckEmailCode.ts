import { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import { ACCOUNT_FORGOT_RESET_PASSWORD } from "../../../constants/path-constants";
import { AuthenticationApi } from "../../../services/api/user-service/authenticationApi";

export const useCheckEmailCode = () => {
    const history = useHistory();
    const [resetCode, setResetCode] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const verifyResetCode = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!resetCode) {
            setError(true);
        } else {
            AuthenticationApi.getUserByPasswordResetCode(resetCode)
                .then((response) => {
                    history.push({ pathname: ACCOUNT_FORGOT_RESET_PASSWORD, state: { user: response.data } });
                })
                .catch(() => setError(true));
        }
    };

    const handleChangeResetCode = (event: ChangeEvent<HTMLInputElement>): void => {
        setResetCode(event.target.value);
    };

    return { resetCode, error, verifyResetCode, handleChangeResetCode };
};
