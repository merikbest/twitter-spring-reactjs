import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Link} from 'react-router-dom';
import {Typography} from "@material-ui/core";

import {ArrowRightIcon} from "../../../../icons";
import {setUsers} from "../../../../store/ducks/users/actionCreators";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";

const MuteAndBlock: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
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
                <Link to={"/settings/privacy_and_safety/blocked"} className={globalClasses.linkWrapper}>
                    <div className={globalClasses.contentLink}>
                        <Typography variant={"body1"} component={"span"}>
                            Blocked accounts
                        </Typography>
                        {ArrowRightIcon}
                    </div>
                </Link>
                <Link to={"/settings/privacy_and_safety/muted"} className={globalClasses.linkWrapper}>
                    <div className={globalClasses.contentLink}>
                        <Typography variant={"body1"} component={"span"}>
                            Muted accounts
                        </Typography>
                        {ArrowRightIcon}
                    </div>
                </Link>
                <Link to={"/settings/privacy_and_safety/muted_keywords"} className={globalClasses.linkWrapper}>
                    <div className={globalClasses.contentLink}>
                        <Typography variant={"body1"} component={"span"}>
                            Muted words
                        </Typography>
                        {ArrowRightIcon}
                    </div>
                </Link>
                <Link to={"/settings/privacy_and_safety/advanced_filters"} className={globalClasses.linkWrapper}>
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

export default withDocumentTitle(MuteAndBlock);
