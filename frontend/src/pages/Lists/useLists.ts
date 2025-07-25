import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchLists, fetchPinnedLists, fetchUserLists, resetListsState } from "../../store/ducks/lists/actionCreators";

export const useLists = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Lists / Twitter";
        dispatch(fetchLists());
        dispatch(fetchUserLists());
        dispatch(fetchPinnedLists());

        return () => {
            dispatch(resetListsState());
        };
    }, [dispatch]);
};
