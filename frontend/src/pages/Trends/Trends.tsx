import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "@material-ui/core";

import TrendsItem from "./TrendsItem/TrendsItem";
import { selectIsTrendsLoading, selectTrendsItems, selectTrendsPagesCount } from "../../store/ducks/tags/selectors";
import { fetchTrends, resetTrendsState } from "../../store/ducks/tags/actionCreators";
import Spinner from "../../components/Spinner/Spinner";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import InfiniteScrollWrapper from "../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const Trends: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsTrendsLoading);
    const trends = useSelector(selectTrendsItems);
    const pagesCount = useSelector(selectTrendsPagesCount);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadTrends(0);

        return () => {
            dispatch(resetTrendsState());
        };
    }, []);

    const loadTrends = (page: number): void => {
        dispatch(fetchTrends(page));
    };

    return (
        <PageWrapper title={"Trends"}>
            <InfiniteScrollWrapper dataLength={trends.length} pagesCount={pagesCount} loadItems={loadTrends}>
                {isLoading && !trends.length ? (
                    <Spinner paddingTop={80} />
                ) : (
                    <List style={{ paddingTop: 48 }}>
                        {trends.map((trend) => <TrendsItem key={trend.id} tag={trend} />)}
                        {isLoading && <Spinner />}
                    </List>
                )}
            </InfiniteScrollWrapper>
        </PageWrapper>
    );
};

export default withDocumentTitle(Trends)("Trends");
