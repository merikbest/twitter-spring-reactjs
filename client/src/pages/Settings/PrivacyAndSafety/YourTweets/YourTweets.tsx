import React, {FC, ReactElement} from 'react';
import {Checkbox, Link as MuiLink, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

import {ArrowRightIcon} from "../../../../icons";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";

const YourTweets: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage the information associated with your Tweets.
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Mark media you Tweet as having material that may be sensitive
                    </Typography>
                    <Checkbox/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`When enabled, pictures and videos you Tweet will be marked as sensitive for people who don’t want to
                        see sensitive content. `}
                    <MuiLink
                        href="https://help.twitter.com/rules-and-policies/media-policy"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Link to={"/settings/privacy_and_safety/location"} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant={"body1"} component={"span"}>
                        Add location information to your Tweets
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default withDocumentTitle(YourTweets);
