import React, { FC, ReactElement } from "react";
import { Link as MuiLink, Typography } from "@material-ui/core";

import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { ADVANCED_TWITTER_MUTE_OPTIONS } from "../../../../../constants/url-constants";

const MutedWords: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});

    return (
        <>
            <div className={globalClasses.infoText}>
                <Typography variant={"h4"} component={"div"}>
                    You aren’t muting any words
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    {`When you mute words, you won’t get any new notifications for Tweets that include them or see Tweets
                        with those words in your timeline. `}
                    <MuiLink href={ADVANCED_TWITTER_MUTE_OPTIONS} component="div" variant="subtitle1" target="_blank"
                             rel="noopener">
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(MutedWords)("Muted words");
