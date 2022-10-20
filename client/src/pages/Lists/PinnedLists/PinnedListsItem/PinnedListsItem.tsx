import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Typography} from "@material-ui/core";

import {usePinnedListsItemStyles} from "./PinnedListsItemStyles";
import {LockIcon} from "../../../../icons";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {PinnedListResponse} from "../../../../store/types/lists";
import PopperListWindow from "../../PopperListWindow/PopperListWindow";
import {LISTS} from "../../../../util/pathConstants";
import {useHoverList} from "../../../../hook/useHoverList";

interface PinnedListsItemProps {
    pinnedList?: PinnedListResponse;
}

const PinnedListsItem: FC<PinnedListsItemProps> = ({pinnedList}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = usePinnedListsItemStyles();
    const {visiblePopperWindow, handleHoverPopper, handleLeavePopper} = useHoverList();
    const pinnedListWallpaper = pinnedList?.wallpaper?.src ? pinnedList?.wallpaper?.src : pinnedList?.altWallpaper;

    return (
        <Link to={`${LISTS}/${pinnedList?.id}`} className={globalClasses.link}>
            <div
                id={"pinnedListWrapper"}
                className={classes.pinnedListWrapper}
                onMouseEnter={() => handleHoverPopper(pinnedList?.id!)}
                onMouseLeave={handleLeavePopper}
            >
                <Avatar variant="square" className={classes.listAvatar} src={pinnedListWallpaper}/>
                <Typography component={"div"} className={classes.pinnedListName}>
                    {pinnedList?.name}
                </Typography>
                {pinnedList?.isPrivate && (
                    <span id={"lockIcon"} className={classes.lockIcon}>
                        {LockIcon}
                    </span>
                )}
                <PopperListWindow visible={visiblePopperWindow}/>
            </div>
        </Link>
    );
};

export default PinnedListsItem;
