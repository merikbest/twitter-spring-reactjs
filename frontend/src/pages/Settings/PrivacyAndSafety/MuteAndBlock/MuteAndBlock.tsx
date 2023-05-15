import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import { ArrowRightIcon } from "../../../../icons";
import { setUsers } from "../../../../store/ducks/users/actionCreators";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import {
    SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS,
    SETTINGS_PRIVACY_AND_SAFETY_BLOCKED,
    SETTINGS_PRIVACY_AND_SAFETY_MUTED,
    SETTINGS_PRIVACY_AND_SAFETY_MUTED_KEYWORDS
} from "../../../../constants/path-constants";

const MuteAndBlock: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setUsers([]));
    }, []);

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage the accounts, words, and notifications that you’ve muted or blocked.
                </Typography>
            </div>
            <div>
                <Link to={SETTINGS_PRIVACY_AND_SAFETY_BLOCKED} className={globalClasses.linkWrapper}>
                    <div className={globalClasses.contentLink}>
                        <Typography variant={"body1"} component={"span"}>
                            Blocked accounts
                        </Typography>
                        {ArrowRightIcon}
                    </div>
                </Link>
                <Link to={SETTINGS_PRIVACY_AND_SAFETY_MUTED} className={globalClasses.linkWrapper}>
                    <div className={globalClasses.contentLink}>
                        <Typography variant={"body1"} component={"span"}>
                            Muted accounts
                        </Typography>
                        {ArrowRightIcon}
                    </div>
                </Link>
                <Link to={SETTINGS_PRIVACY_AND_SAFETY_MUTED_KEYWORDS} className={globalClasses.linkWrapper}>
                    <div className={globalClasses.contentLink}>
                        <Typography variant={"body1"} component={"span"}>
                            Muted words
                        </Typography>
                        {ArrowRightIcon}
                    </div>
                </Link>
                <Link to={SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS} className={globalClasses.linkWrapper}>
                    <div className={globalClasses.contentLink}>
                        <Typography variant={"body1"} component={"span"}>
                            Muted notifications
                        </Typography>
                        {ArrowRightIcon}
                    </div>
                </Link>
            </div>
        </>
    );
};

export default withDocumentTitle(MuteAndBlock)("Mute and block");
