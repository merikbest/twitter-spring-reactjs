import React, {FC, ReactElement, useState,} from 'react';
import { colors } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import ArrowBottomIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';
import {useHomeStyles} from "../../pages/Home/HomeStyles";

interface UserSideProfileProps {
    classes: ReturnType<typeof useHomeStyles>;
}

export const UserSideProfile: FC<UserSideProfileProps> = ({classes}: UserSideProfileProps): ReactElement => {
    const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
    const anchorRef = React.useRef<HTMLDivElement>();

    const handleOpenPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        anchorRef.current = event.currentTarget;
        setVisiblePopup(true);
    };

    const handleClosePopup = (): void => {
        setVisiblePopup(false);
    };

    return (
        <>
            <div onClick={handleOpenPopup} className={classes.sideProfile}>
                <Avatar src="https://avatars.githubusercontent.com/u/56604599?v=4" />
                <div className={classes.sideProfileInfo}>
                    <b>Vbhjckfd1</b>
                    <Typography style={{ color: colors.grey[500] }}>@Vbhjckfd1</Typography>
                </div>
                <ArrowBottomIcon />
            </div>
            <Popover
                open={visiblePopup}
                onClose={handleClosePopup}
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}>
                The content of the Popover.
            </Popover>
        </>
    );
};
