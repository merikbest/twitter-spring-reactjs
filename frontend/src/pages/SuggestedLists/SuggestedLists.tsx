import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";

import { fetchLists } from "../../store/ducks/lists/actionCreators";
import { selectIsLoading, selectListsItems } from "../../store/ducks/lists/selectors";
import ListsItem from "../Lists/ListsItem/ListsItem";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import SuggestedListsDescription from "./SuggestedListsDescription/SuggestedListsDescription";

const SuggestedLists: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const lists = useSelector(selectListsItems);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchLists());
    }, []);

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <SuggestedListsDescription />
            {isLoading ? (
                <Spinner />
            ) : (
                lists.map((list) => <ListsItem key={list.id} list={list} />)
            )}
        </Paper>
    );
};

export default SuggestedLists;
