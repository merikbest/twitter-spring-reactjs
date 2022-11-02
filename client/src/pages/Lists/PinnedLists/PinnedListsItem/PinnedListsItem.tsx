import React, {FC, memo, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Typography} from "@material-ui/core";

import {usePinnedListsItemStyles} from "./PinnedListsItemStyles";
import LockIcon from "../../../../components/LockIcon/LockIcon";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {PinnedListResponse} from "../../../../store/types/lists";
import PopperListWindow from "../../PopperListWindow/PopperListWindow";
import {LISTS} from "../../../../util/pathConstants";
import {useHoverList} from "../../../../hook/useHoverList";

interface PinnedListsItemProps {
    pinnedList?: PinnedListResponse;
}

const PinnedListsItem: FC<PinnedListsItemProps> = memo(({pinnedList}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = usePinnedListsItemStyles();
    const {visiblePopperWindow, handleHoverPopper, handleLeavePopper} = useHoverList();
    const pinnedListWallpaper = pinnedList?.wallpaper ? pinnedList?.wallpaper?.src : pinnedList?.altWallpaper;

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
                    {pinnedList?.isPrivate && <LockIcon/>}
                    {" "}{pinnedList?.name}
                </Typography>
                <PopperListWindow visible={visiblePopperWindow}/>
            </div>
        </Link>
    );
});

export default PinnedListsItem;
