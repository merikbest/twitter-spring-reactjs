import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Checkbox, Link as MuiLink, Typography} from "@material-ui/core";

import {useAudienceAndTaggingStyles} from "./AudienceAndTaggingStyles";
import {ArrowRightIcon} from "../../../../icons";
import {selectUserData} from "../../../../store/ducks/user/selectors";
import {setUserLoadingStatus, updatePrivateProfile} from "../../../../store/ducks/user/actionCreators";
import {LoadingStatus} from "../../../../store/types";

const AudienceAndTagging: FC = (): ReactElement => {
    const classes = useAudienceAndTaggingStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        if (myProfile) {
            setChecked(myProfile?.privateProfile ? myProfile.privateProfile : false);
        }

        return () => {
            dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
        };
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        dispatch(updatePrivateProfile({privateProfile: event.target.checked}));
    };

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage what information you allow other people on Twitter to see.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        Protect your Tweets
                    </Typography>
                    <Checkbox checked={checked} onChange={handleChange}/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`When selected, your Tweets and other account information are only visible to people who follow you. `}
                    <MuiLink
                        href="https://help.twitter.com/safety-and-security/public-and-protected-tweets"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Link to={"/settings/privacy_and_safety/tagging"} className={classes.photoTaggingWrapper}>
                <div className={classes.photoTaggingLink}>
                    <div className={classes.photoTagInfo}>
                        <Typography variant={"body1"} component={"div"}>
                            Photo tagging
                        </Typography>
                        <Typography variant={"subtitle2"} component={"div"}>
                            Anyone can tag you
                        </Typography>
                    </div>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default AudienceAndTagging;
