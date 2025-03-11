import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Spinner from "../../../components/Spinner/Spinner";
import ListsItem from "../ListsItem/ListsItem";
import { SUGGESTED } from "../../../constants/path-constants";
import { useDiscoverListsStyles } from "./DiscoverListsStyles";
import { useGlobalStyles } from "../../../util/globalClasses";
import { selectIsListsLoading, selectListsItems } from "../../../store/ducks/lists/selectors";

const DiscoverLists = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useDiscoverListsStyles();
    const lists = useSelector(selectListsItems);
    const isListsLoading = useSelector(selectIsListsLoading);
    const { t } = useTranslation();

    return (
        <Paper id="list" className={classes.newLists} variant="outlined">
            <Typography variant="h5" className={globalClasses.itemInfoWrapper}>
                {t("DISCOVER_NEW_LISTS", { defaultValue: "Discover new Lists" })}
            </Typography>
            {isListsLoading ? (
                <div style={{ padding: "59px 0px" }}>
                    <Spinner />
                </div>
            ) : (
                lists.slice(0, 3).map((list, index) => (
                    <ListsItem key={list.id} list={list} listIndex={index} />
                ))
            )}
            <Link to={SUGGESTED} className={globalClasses.link}>
                <Typography variant="body1" component="div" className={classes.showMore}>
                    {t("SHOW_MORE", { defaultValue: "Show more" })}
                </Typography>
            </Link>
        </Paper>
    );
};

export default DiscoverLists;
