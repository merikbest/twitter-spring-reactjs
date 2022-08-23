import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {List} from "@material-ui/core";

import TrendsItem from "./TrendsItem/TrendsItem";
import {selectIsTrendsLoading, selectTrendsItems} from "../../store/ducks/tags/selectors";
import {fetchTrends, resetTrendsState} from "../../store/ducks/tags/actionCreators";
import Spinner from "../../components/Spinner/Spinner";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";

const Trends: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsTrendsLoading);
    const trends = useSelector(selectTrendsItems);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchTrends(0));

        return () => {
            dispatch(resetTrendsState());
        };
    }, []);

    return (
        <div>
            {isLoading ? (
                <Spinner paddingTop={80}/>
            ) : (
                <List style={{paddingTop: 48}}>
                    {trends.map((trend) => <TrendsItem key={trend.id} tag={trend}/>)}
                </List>
            )}
        </div>
    );
};

export default withDocumentTitle(Trends)("Trends");
