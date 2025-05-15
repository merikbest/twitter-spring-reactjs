import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchSignIn, setUserLoadingStatus } from "../../store/ducks/user/actionCreators";
import { LoadingStatus } from "../../types/common";
import { selectUserIsError } from "../../store/ducks/user/selectors";

export const useLogin = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const errorStatus = useSelector(selectUserIsError);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(fetchSignIn({ email, password, history }));
    };

    useEffect(() => {
        return () => {
            dispatch(setUserLoadingStatus(LoadingStatus.LOADING));
        };
    }, []);

    return {
        email,
        password,
        errorStatus,
        handleChangeEmail,
        handleChangePassword,
        onSubmit
    };
};
