import React, {FC, ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Typography} from "@material-ui/core";

import {usePinnedListsItemStyles} from "./PinnedListsItemStyles";
import {Lists} from "../../../store/ducks/lists/contracts/state";
import PopperListWindow from "../PopperListWindow/PopperListWindow";

interface PinnedListsItemProps {
    pinnedList: Lists;
}

const PinnedListsItem: FC<PinnedListsItemProps> = ({pinnedList}): ReactElement => {
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
        <Link to={`/lists/${pinnedList?.id}`} className={classes.link}>
            <div className={classes.pinnedListWrapper} onMouseEnter={handleHoverList} onMouseLeave={handleLeaveList}>
                <Avatar
                    variant="square"
                    className={classes.listAvatar}
                    src={pinnedList?.wallpaper?.src ? pinnedList?.wallpaper?.src : pinnedList?.altWallpaper}
                />
                <Typography component={"div"} className={classes.pinnedListName}>
                    {pinnedList?.name}
                </Typography>
                <PopperListWindow visible={visiblePopperListWindow} list={pinnedList!}/>
            </div>
        </Link>
    );
};

export default PinnedListsItem;
