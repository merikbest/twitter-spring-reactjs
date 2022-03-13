import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Link as MuiLink, Typography} from "@material-ui/core";

import {selectUserData} from "../../../../store/ducks/user/selectors";
import {setUserLoadingStatus, updateDirect} from "../../../../store/ducks/user/actionCreators";
import {LoadingStatus} from "../../../../store/types";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";

const DirectMessages: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        if (myProfile) {
            setChecked(myProfile?.mutedDirectMessages ? myProfile.mutedDirectMessages : false);
        }

        return () => {
            dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
        };
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        dispatch(updateDirect({mutedDirectMessages: event.target.checked}));
    };

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage who can message you directly.
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Allow message requests from everyone
                    </Typography>
                    <Checkbox checked={checked} onChange={handleChange}/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`Let people who you don’t follow send you message requests and add you to group conversations. To
                        reply to their messages, you need to accept the request. `}
                    <MuiLink
                        href="https://help.twitter.com/using-twitter/direct-messages#receive"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Filter low-quality messages
                    </Typography>
                    <Checkbox/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`Hide message requests that have been detected as being potentially spam or low-quality. These will
                    be sent to a separate inbox at the bottom of your message requests. You can still access them if you
                    want. `}
                    <MuiLink
                        href="https://help.twitter.com/using-twitter/direct-messages"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Show read receipts
                    </Typography>
                    <Checkbox/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`Let people you’re messaging with know when you’ve seen their messages. Read receipts are not shown
                        on message requests. `}
                    <MuiLink
                        href="https://help.twitter.com/using-twitter/direct-messages#receipts"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(DirectMessages);
