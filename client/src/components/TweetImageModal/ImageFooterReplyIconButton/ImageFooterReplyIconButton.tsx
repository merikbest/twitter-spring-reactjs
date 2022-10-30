import React, {FC, memo, ReactElement} from "react";
import {useSelector} from "react-redux";
import {IconButton} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import {selectRepliesCount} from "../../../store/ducks/tweet/selectors";
import {ReplyIcon} from "../../../icons";

interface ImageFooterReplyIconButtonProps {
    classes: ClassNameMap<string>
}

const ImageFooterReplyIconButton: FC<ImageFooterReplyIconButtonProps> = memo(({classes}): ReactElement => {
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
