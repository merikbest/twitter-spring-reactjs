import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectIsTrendsLoading, selectTrendsItems, selectTrendsPagesCount } from "../../store/ducks/tags/selectors";
import { fetchTrends, resetTrendsState } from "../../store/ducks/tags/actionCreators";

export const useTrends = () => {
    const dispatch = useDispatch();
    const isTrendsLoading = useSelector(selectIsTrendsLoading);
    const trends = useSelector(selectTrendsItems);
    const pagesCount = useSelector(selectTrendsPagesCount);

    const loadTrends = (page: number): void => {
        dispatch(fetchTrends(page));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        loadTrends(0);

        return () => {
            dispatch(resetTrendsState());
        };
    }, [dispatch]);

    return { isTrendsLoading, trends, pagesCount, loadTrends };
};
