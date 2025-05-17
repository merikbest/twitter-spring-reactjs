import React, { FC, ReactElement } from "react";
import { List } from "@material-ui/core";

import TrendsItem from "./TrendsItem";
import Spinner from "../../components/Spinner/Spinner";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import InfiniteScrollWrapper from "../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { useTrends } from "./useTrends";

const Trends: FC = (): ReactElement => {
    const { isTrendsLoading, trends, pagesCount, loadTrends } = useTrends();

    return (
        <PageWrapper translationKey="TRENDS" defaultValue="Trends">
            <InfiniteScrollWrapper dataLength={trends.length} pagesCount={pagesCount} loadItems={loadTrends}>
                {isTrendsLoading && !trends.length ? (
                    <Spinner paddingTop={80} />
                ) : (
                    <List style={{ paddingTop: 48 }}>
                        {trends.map((trend) => <TrendsItem key={trend.id} tag={trend} />)}
                        {isTrendsLoading && <Spinner />}
                    </List>
                )}
            </InfiniteScrollWrapper>
        </PageWrapper>
    );
};

export default withDocumentTitle(Trends)("Trends");
