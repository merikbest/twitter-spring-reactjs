import React, { FC, memo, ReactElement } from "react";

import { useGifImageStyles } from "./GifImageStyles";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import { CloseIcon } from "../../icons";
import { GifImageResponse } from "../../types/tweet";

interface GifImageProps {
    gifImage?: GifImageResponse;
    onClickRemoveGif?: () => void;
}

const GifImage: FC<GifImageProps> = memo(({ gifImage, onClickRemoveGif }): ReactElement => {
    const classes = useGifImageStyles({ width: gifImage!.width, height: gifImage!.height });

    return (
        <div className={classes.gif}>
            <img src={gifImage?.url} alt={""} />
            {onClickRemoveGif && (
                <div className={classes.gifRemove}>
                    <ActionIconButton
                        actionText={"Remove"}
                        icon={CloseIcon}
                        onClick={onClickRemoveGif}
                        size={"medium"}
                    />
                </div>
            )}
        </div>
    );
});

export default GifImage;
