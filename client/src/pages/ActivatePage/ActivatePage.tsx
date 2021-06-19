import React, {useEffect} from 'react';
import {LoadingStatus} from "../../store/types";
import {setUserLoadingStatus} from "../../store/ducks/user/actionCreators";
import {AuthApi} from "../../services/api/authApi";
import {useDispatch} from "react-redux";

const ActivatePage = () => {
    const dispatch = useDispatch();

   useEffect(() => {
        dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
        const hash = window.location.pathname.split('/').pop();
        if (hash) {
            AuthApi.verify(hash)
                .then(({ data }) => {
                    window.localStorage.setItem('token', data.token);
                    // window.location.href = '/home';
                })
                .catch(() => {
                    dispatch(setUserLoadingStatus(LoadingStatus.LOADED));
                });
        }
    }, []);

    return null;
};

export default ActivatePage;
