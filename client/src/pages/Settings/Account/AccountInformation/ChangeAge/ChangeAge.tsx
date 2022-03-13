import React, {FC, ReactElement} from 'react';
import {Divider, Link as MuiLink, Typography} from "@material-ui/core";

import {useGlobalStyles} from "../../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../../hoc/withDocumentTitle";

const ChangeAge: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <div>
            <Typography variant={"body1"} component={"div"} className={globalClasses.itemInfoWrapper}>
                {`If you haven’t provided a date of birth, we’ve provided an age range based on your Twitter
                    profile and activity. Age information is used to personalize your experience. `}
                <MuiLink
                    href="https://help.twitter.com/safety-and-security/birthday-visibility-settings"
                    target="_blank"
                    rel="noopener"
                >
                    Learn more
                </MuiLink>
            </Typography>
            <Divider/>
            <Typography variant={"body1"} component={"div"} className={globalClasses.itemInfoWrapper}>
                13-64
            </Typography>
            <Divider/>
            <Typography variant={"body1"} component={"div"} className={globalClasses.itemInfoWrapper}>
                Not right? You can add your date of birth to your profile without sharing it publicly.
            </Typography>
        </div>
    );
};

export default withDocumentTitle(ChangeAge);
