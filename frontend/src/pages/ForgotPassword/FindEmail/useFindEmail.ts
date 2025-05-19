import { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import { ACCOUNT_FORGOT_SEND_PASSWORD_RESET } from "../../../constants/path-constants";
import { AuthenticationApi } from "../../../services/api/user-service/authenticationApi";

export const useFindEmail = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const findExistingEmail = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        AuthenticationApi.getExistingEmail({ email })
            .then(() => {
                setError(false);
                history.push({ pathname: ACCOUNT_FORGOT_SEND_PASSWORD_RESET, state: { email } });
            })
            .catch(() => setError(true));
    };

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    return { email, error, findExistingEmail, handleChangeEmail };
};
