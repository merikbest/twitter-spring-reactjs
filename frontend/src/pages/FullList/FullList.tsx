import React, { FC, ReactElement } from "react";
import { Paper } from "@material-ui/core";

import { useFullListStyles } from "./FullListStyles";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import FollowListButton from "../../components/FollowListButton/FollowListButton";
import FullListTweets from "./FullListTweets";
import MembersAndFollowers from "./MembersAndFollowers";
import EditListButton from "./EditListButton";
import FullListHeader from "./FullListHeader";
import FullListWallpaper from "./FullListWallpaper";
import FullListDescription from "./FullListDescription";
import { useFullList } from "./useFullList";

const FullList: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useFullListStyles();
    const { myProfileId, listId, listIsFollower, listOwnerId, isListLoading } = useFullList();

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <FullListHeader />
            <div className={globalClasses.contentWrapper}>
                {isListLoading ? (
                    <Spinner paddingTop={250} />
                ) : (
                    <>
                        <FullListWallpaper />
                        <Paper className={classes.listInfo} variant="outlined">
                            <FullListDescription />
                            <MembersAndFollowers />
                            <div className={classes.buttonWrapper}>
                                {(myProfileId === listOwnerId) ? (
                                    <EditListButton />
                                ) : (
                                    <FollowListButton listId={listId!} isFollower={listIsFollower!} />
                                )}
                            </div>
                        </Paper>
                    </>
                )}
                <FullListTweets />
            </div>
        </Paper>
    );
};

export default FullList;
