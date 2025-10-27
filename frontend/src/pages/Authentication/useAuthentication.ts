import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { ACCOUNT_LOGIN } from "../../constants/path-constants";
import { setOpenModal } from "../../store/ducks/authentication/actionCreators";

export const useAuthentication = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClickOpenSignIn = useCallback((): void => {
        history.push(ACCOUNT_LOGIN);
    }, [history]);

    const handleClickOpenSignUp = useCallback((): void => {
        dispatch(setOpenModal());
    }, [dispatch]);

    return { handleClickOpenSignIn, handleClickOpenSignUp };
};
