import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { useImageActionStyles } from "./ImageActionStyles";

interface ImageActionProps {
    subtitle: string;
    icon: JSX.Element;
    onClick: () => void;
}

const ImageAction: FC<ImageActionProps> = ({ subtitle, icon, onClick }): ReactElement => {
    const classes = useImageActionStyles();

    return (
        <div className={classes.imageAction} onClick={onClick}>
            <>{icon}</>
            <Typography variant={"subtitle1"} component={"span"}>
                {subtitle}
            </Typography>
        </div>
    );
};

export default ImageAction;
