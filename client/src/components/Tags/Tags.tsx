import React, {FC, ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {List, ListItem, ListItemText, Paper, Typography, IconButton} from "@material-ui/core";

import {SettingsIcon} from "../../icons";
import {selectIsTagsLoading, selectTagsItems} from "../../store/ducks/tags/selectors";
import {useTagsStyles} from "./TagsStyles";
import Spinner from "../Spinner/Spinner";
import {TagResponse} from "../../store/types/tag";
import {HoverActionProps, HoverActions, withHoverAction} from "../../hoc/withHoverAction";
import HoverAction from "../HoverAction/HoverAction";
import SettingsModal from "./SettingsModal/SettingsModal";

const Tags: FC<HoverActionProps> = (
    {
        visibleHoverAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement => {
    const classes = useTagsStyles();
    const tags = useSelector(selectTagsItems);
    const isTagsLoading = useSelector(selectIsTagsLoading);
    const [visibleSettingsModal, setVisibleSettingsModal] = useState<boolean>(false);

    const onOpenSettingsModal = (): void => {
        setVisibleSettingsModal(true);
    };

    const onCloseSettingsModal = (): void => {
        setVisibleSettingsModal(false);
    };

    return (
        <Paper className={classes.container}>
            <Paper className={classes.header} variant="outlined">
                <Typography variant={"h5"} component={"div"}>
                    Trends for you
                </Typography>
                <IconButton
                    color="primary"
                    onClick={onOpenSettingsModal}
                    onMouseEnter={() => handleHoverAction?.(HoverActions.OTHER)}
                    onMouseLeave={handleLeaveAction}
                >
                    <>{SettingsIcon}</>
                    <HoverAction visible={visibleHoverAction?.visibleOtherAction} actionText={"Settings"}/>
                </IconButton>
            </Paper>
            {isTagsLoading ? (
                <Spinner/>
            ) : (
                <List>
                    {tags.slice(0, 3).map((tag: TagResponse) => (
                        <Link key={tag.id} to={{pathname: "/search", state: {tag: tag.tagName}}}>
                            <ListItem className={classes.item}>
                                <ListItemText
                                    primary={tag.tagName}
                                    secondary={
                                        <Typography component="span" variant="body2" color="textSecondary">
                                            {tag.tweetsQuantity} Tweets
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </Link>
                    ))}
                    <Link to={"/home/trends"}>
                        <ListItem className={classes.footer}>
                            <Typography variant={"body1"} component={"span"}>
                                Show more
                            </Typography>
                        </ListItem>
                    </Link>
                </List>
            )}
            <SettingsModal visible={visibleSettingsModal} onClose={onCloseSettingsModal}/>
        </Paper>
    );
};

export default withHoverAction(Tags);
