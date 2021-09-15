import React, {FC, ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {Avatar} from "@material-ui/core";

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

    const handleHover = (): void => {
        setDelayHandler(setTimeout(() => setVisiblePopperListWindow(true), 1337));
    };

    const handleLeave = (): void => {
        clearTimeout(delayHandler);
        setVisiblePopperListWindow(false);
    };

    return (
        <Link to={`/lists/${pinnedList.id}`} className={classes.link}>
            <div className={classes.pinnedListWrapper} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                <Avatar
                    variant="square"
                    className={classes.listAvatar}
                    src={pinnedList.wallpaper?.src ? pinnedList.wallpaper?.src : pinnedList.altWallpaper}
                />
                <div className={classes.pinnedListName}>{pinnedList.name}</div>
                {visiblePopperListWindow && <PopperListWindow list={pinnedList}/>}
            </div>
        </Link>
    );
};

export default PinnedListsItem;
