import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Avatar} from "@material-ui/core";

import {usePinnedListsItemStyles} from "./PinnedListsItemStyles";
import {Lists} from "../../../store/ducks/lists/contracts/state";

interface PinnedListsItemProps {
    pinnedList: Lists;
}

const PinnedListsItem: FC<PinnedListsItemProps> = ({pinnedList}): ReactElement => {
    const classes = usePinnedListsItemStyles();

    return (
        <Link to={`/lists/${pinnedList.id}`} className={classes.link}>
            <div className={classes.pinnedListWrapper}>
                <Avatar
                    variant="square"
                    className={classes.listAvatar}
                    src={pinnedList.wallpaper?.src ? pinnedList.wallpaper?.src : pinnedList.altWallpaper}
                />
                <div className={classes.pinnedListName}>{pinnedList.name}</div>
            </div>
        </Link>
    );
};

export default PinnedListsItem;
