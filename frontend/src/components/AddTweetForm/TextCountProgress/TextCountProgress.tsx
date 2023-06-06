import React, { FC, memo, ReactElement } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { MAX_TEXT_LENGTH } from "../../../constants/common-constants";
import { useTextCountProgressStyles } from "./TextCountProgressStyles";

interface TextCountProgressProps {
    text: string;
}

const TextCountProgress: FC<TextCountProgressProps> = memo(({ text }): ReactElement => {
    const classes = useTextCountProgressStyles();
    const textLimitPercent = Math.round((text.length / MAX_TEXT_LENGTH) * 100);
    const textCount = MAX_TEXT_LENGTH - text.length;

    return (
        <>
            {text && (
                <>
                    <span id={"textCount"}>
                        {textCount}
                    </span>
                    <div className={classes.footerAddFormCircleProgress}>
                        <CircularProgress
                            className={text.length >= MAX_TEXT_LENGTH ? classes.progressColor : undefined}
                            value={text.length >= MAX_TEXT_LENGTH ? 100 : textLimitPercent}
                            variant="determinate"
                            size={20}
                            thickness={5}
                        />
                        <CircularProgress
                            className={classes.defaultProgressColor}
                            variant="determinate"
                            size={20}
                            thickness={5}
                            value={100}
                        />
                    </div>
                </>
            )}
        </>
    );
});

export default TextCountProgress;
