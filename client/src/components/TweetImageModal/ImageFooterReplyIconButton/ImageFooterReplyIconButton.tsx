import React, {memo, ReactElement} from "react";
import {useSelector} from "react-redux";
import {IconButton} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import {selectRepliesCount} from "../../../store/ducks/tweet/selectors";
import {useImageFooterButtonStyles} from "../ImageFooterButtonStyles";
import {ReplyIcon} from "../../../icons";

const ImageFooterReplyIconButton = memo((): ReactElement => {
    const classes = useImageFooterButtonStyles()
    const repliesCount = useSelector(selectRepliesCount);

    return (
        <div className={classes.imageFooterIcon}>
            <IconButton size="small">
                <>{ReplyIcon}</>
            </IconButton>
            {repliesCount && (
                <Typography id={"repliesCount"} variant={"body1"} component={"span"}>
                    {repliesCount}
                </Typography>
            )}
        </div>
    );
});

export default ImageFooterReplyIconButton;
