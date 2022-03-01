import React, {FC, ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Typography} from "@material-ui/core";

import {usePinnedListsItemStyles} from "./PinnedListsItemStyles";
import {LockIcon} from "../../../icons";
import {useGlobalStyles} from "../../../util/globalClasses";
import {PinnedListResponse} from "../../../store/types/lists";

interface PinnedListsItemProps {
    pinnedList: PinnedListResponse;
}

const PinnedListsItem: FC<PinnedListsItemProps> = ({pinnedList}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = usePinnedListsItemStyles();
    const [visiblePopperListWindow, setVisiblePopperListWindow] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);

    const handleHoverList = (): void => {
        setDelayHandler(setTimeout(() => setVisiblePopperListWindow(true), 1000));
    };

    const handleLeaveList  = (): void => {
        clearTimeout(delayHandler);
        setVisiblePopperListWindow(false);
    };

    return (
        <Link to={`/lists/${pinnedList?.id}`} className={globalClasses.link}>
            <div className={classes.pinnedListWrapper} onMouseEnter={handleHoverList} onMouseLeave={handleLeaveList}>
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
                {/*TODO <PopperListWindow visible={visiblePopperListWindow} list={pinnedList!}/> */}
            </div>
        </Link>
    );
};

export default PinnedListsItem;
