import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { List, ListItem, Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { selectIsTagsLoading, selectTagsItems } from "../../store/ducks/tags/selectors";
import { useTagsStyles } from "./TagsStyles";
import Spinner from "../Spinner/Spinner";
import SettingsModal from "./SettingsModal/SettingsModal";
import { HOME_TRENDS } from "../../constants/path-constants";
import TagItem from "./TagItem/TagItem";

const Tags = (): ReactElement => {
    const classes = useTagsStyles();
    const tags = useSelector(selectTagsItems);
    const isTagsLoading = useSelector(selectIsTagsLoading);
    const { t } = useTranslation();

    return (
        <Paper className={classes.container}>
            <Paper className={classes.header} variant="outlined">
                <Typography variant={"h5"} component={"div"}>
                    {t("TRENDS_FOR_YOU", { defaultValue: "Trends for you" })}
                </Typography>
                <SettingsModal />
            </Paper>
            {isTagsLoading ? (
                <Spinner />
            ) : (
                <List>
                    {tags.slice(0, 3).map((tag) => (<TagItem key={tag.id} tag={tag} classes={classes} />))}
                    <Link to={HOME_TRENDS}>
                        <ListItem className={classes.footer}>
                            <Typography variant={"body1"} component={"span"}>
                                {t("SHOW_MORE", { defaultValue: "Show more" })}
                            </Typography>
                        </ListItem>
                    </Link>
                </List>
            )}
        </Paper>
    );
};

export default Tags;
