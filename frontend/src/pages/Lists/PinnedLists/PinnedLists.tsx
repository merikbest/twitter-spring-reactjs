import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";

import Spinner from "../../../components/Spinner/Spinner";
import PinnedListsItem from "./PinnedListsItem/PinnedListsItem";
import { useGlobalStyles } from "../../../util/globalClasses";
import { usePinnedListsStyles } from "./PinnedListsStyles";
import {
    selectIsPinnedListsLoaded,
    selectIsPinnedListsLoading,
    selectPinnedListsItems
} from "../../../store/ducks/lists/selectors";

const PinnedLists = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = usePinnedListsStyles();
    const isPinnedListsLoading = useSelector(selectIsPinnedListsLoading);
    const isPinnedListsLoaded = useSelector(selectIsPinnedListsLoaded);
    const pinnedLists = useSelector(selectPinnedListsItems);

    return (
        <Paper className={classes.pinnedLists} variant="outlined">
            <Typography variant="h5" className={globalClasses.itemInfoWrapper}>
                Pinned Lists
            </Typography>
            <Typography component={"div"} className={classes.pinnedListsWrapper}>
                {isPinnedListsLoading ? (
                    <Spinner paddingTop={34} />
                ) : (
                    (pinnedLists.length === 0 && isPinnedListsLoaded) ? (
                        <Typography variant={"subtitle1"} component={"div"} className={classes.pinnedListsText}>
                            Nothing to see here yet — pin your favorite Lists to access them quickly.
                        </Typography>
                    ) : (
                        pinnedLists.map((pinnedList) => (
                            <PinnedListsItem key={pinnedList.id} pinnedList={pinnedList} />
                        ))
                    )
                )}
            </Typography>
        </Paper>
    );
};

export default PinnedLists;
