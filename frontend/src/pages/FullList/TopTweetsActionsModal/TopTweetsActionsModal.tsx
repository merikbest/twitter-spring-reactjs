import React, { ReactElement } from "react";
import { ClickAwayListener, List } from "@material-ui/core";

import { useTopTweetsActionsModalStyles } from "./TopTweetsActionsModalStyles";
import { EditIcon, NotShowIcon, SeeLatestIcon } from "../../../icons";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { useClickAway } from "../../../hook/useClickAway";
import TopTweetsItem from "./TopTweetsItem/TopTweetsItem";

const TopTweetsActionsModal = (): ReactElement => {
    const classes = useTopTweetsActionsModalStyles();
    const { open, onClickOpen, onClickClose } = useClickAway();

    return (
        <>
            <ClickAwayListener onClickAway={onClickClose}>
                <div className={classes.root}>
                    <ActionIconButton onClick={onClickOpen} actionText={"More"} icon={EditIcon} />
                    {open && (
                        <div className={classes.dropdown}>
                            <List>
                                <TopTweetsItem
                                    icon={SeeLatestIcon}
                                    title={"See top Tweets"}
                                    subtitle={"You’re seeing top Tweets first. Latest Tweets will show up as they happen."}
                                />
                                <TopTweetsItem
                                    icon={NotShowIcon}
                                    title={"Don’t show these Tweets in Home"}
                                    subtitle={"Top Tweets from this List will no longer show up in your Home timeline."}
                                />
                            </List>
                        </div>
                    )}
                </div>
            </ClickAwayListener>
        </>
    );
};

export default TopTweetsActionsModal;
