import React, { FC, memo, ReactElement } from "react";
import { IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import { useImageFooterButtonStyles } from "../ImageFooterButtonStyles";

interface ImageFooterButtonProps {
    id: string;
    icon: JSX.Element;
    count: number;
    onClick?: () => void;
}

const ImageFooterButton: FC<ImageFooterButtonProps> = memo(({ id, icon, count, onClick }): ReactElement => {
    const classes = useImageFooterButtonStyles();

    return (
        <div className={classes.imageFooterIcon}>
            <IconButton onClick={onClick} size="small">
                {icon}
            </IconButton>
            {(count !== 0) && (
                <Typography id={id} variant={"body1"} component={"span"}>
                    {count}
                </Typography>
            )}
        </div>
    );
});

export default ImageFooterButton;
