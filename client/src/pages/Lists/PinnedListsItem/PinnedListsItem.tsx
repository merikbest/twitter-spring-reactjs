import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Typography} from "@material-ui/core";

import {usePinnedListsItemStyles} from "./PinnedListsItemStyles";
import {LockIcon} from "../../../icons";
import {useGlobalStyles} from "../../../util/globalClasses";
import {PinnedListResponse} from "../../../store/types/lists";
import {HoverListProps, withHoverList} from "../../../hoc/withHoverList";
import PopperListWindow from "../PopperListWindow/PopperListWindow";

interface PinnedListsItemProps {
    pinnedList?: PinnedListResponse;
}

const PinnedListsItem: FC<PinnedListsItemProps & HoverListProps> = (
    {
        pinnedList,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = usePinnedListsItemStyles();

    return (
        <Link to={`/lists/${pinnedList?.id}`} className={globalClasses.link}>
            <div
                className={classes.pinnedListWrapper}
                onMouseEnter={() => handleHoverPopper!(pinnedList?.id!)}
                onMouseLeave={handleLeavePopper}
            >
                <Avatar
                    variant="square"
                    className={classes.listAvatar}
                    src={pinnedList?.wallpaper?.src ? pinnedList?.wallpaper?.src : pinnedList?.altWallpaper}
                />
                <Typography component={"div"} className={classes.pinnedListName}>
                    {pinnedList?.name}
                </Typography>
                {pinnedList?.isPrivate && (
                    <span className={classes.lockIcon}>
                        {LockIcon}
                    </span>
                )}
                <PopperListWindow visible={visiblePopperWindow}/>
            </div>
        </Link>
    );
};

export default withHoverList(PinnedListsItem);
