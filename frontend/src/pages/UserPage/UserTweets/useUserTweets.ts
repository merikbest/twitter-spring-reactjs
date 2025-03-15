import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { resetUserTweets } from "../../../store/ducks/userTweets/actionCreators";
import { selectUsersIsSuccessLoaded } from "../../../store/ducks/userProfile/selectors";

export const useUserTweets = () => {
    const dispatch = useDispatch();
    const isUserProfileSuccessLoaded = useSelector(selectUsersIsSuccessLoaded);
    const { userId } = useParams<{ userId: string }>();
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        if (isUserProfileSuccessLoaded) {
            setPage(prevState => prevState + 1);
        }
    }, [isUserProfileSuccessLoaded]);

    const handleShowTweets = (fetchAction: (params: { userId: string; page: number }) => void): void => {
        window.scrollTo(0, 0);
        setPage(1);
        dispatch(resetUserTweets());
        dispatch(fetchAction({ userId, page: 0 }));
    };

    return { page, setPage, handleShowTweets };
};
