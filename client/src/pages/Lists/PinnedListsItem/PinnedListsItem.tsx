import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Avatar} from "@material-ui/core";

import {usePinnedListsItemStyles} from "./PinnedListsItemStyles";
import {Lists} from "../../../store/ducks/lists/contracts/state";
import PopperListWindow from "../PopperListWindow/PopperListWindow";
import {withHoverUser} from "../../../hoc/withHoverUser";

interface PinnedListsItemProps<T> {
    item?: T;
    visiblePopperWindow?: boolean;
    handleHover?: () => void;
    handleLeave?: () => void;
}

const PinnedListsItem: FC<PinnedListsItemProps<Lists>> = (
    {
        item: pinnedList,
        visiblePopperWindow,
        handleHover,
        handleLeave
    }
): ReactElement => {
    const classes = usePinnedListsItemStyles();

    return (
        <Link to={`/lists/${pinnedList?.id}`} className={classes.link}>
            <div className={classes.pinnedListWrapper} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                <Avatar
                    variant="square"
                    className={classes.listAvatar}
                    src={pinnedList?.wallpaper?.src ? pinnedList?.wallpaper?.src : pinnedList?.altWallpaper}
                />
                <div className={classes.pinnedListName}>{pinnedList?.name}</div>
                {visiblePopperWindow && <PopperListWindow list={pinnedList!}/>}
            </div>
        </Link>
    );
};

export default withHoverUser(PinnedListsItem);
