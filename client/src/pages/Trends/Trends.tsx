import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {List} from "@material-ui/core";

import TrendsItem from "./TrendsItem/TrendsItem";
import {selectIsTagsLoading, selectTagsItems} from "../../store/ducks/tags/selectors";
import {fetchTrends} from "../../store/ducks/tags/actionCreators";
import Spinner from "../../components/Spinner/Spinner";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";

const Trends: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsTagsLoading);
    const trends = useSelector(selectTagsItems);

    useEffect(() => {
        dispatch(fetchTrends());
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            {isLoading ? (
                <Spinner paddingTop={80}/>
            ) : (
                <List style={{paddingTop: 48}}>
                    {trends.map((tag) => <TrendsItem key={tag.id} tag={tag}/>)}
                </List>
            )}
        </div>
    );
};

export default withDocumentTitle(Trends)("Trends");
