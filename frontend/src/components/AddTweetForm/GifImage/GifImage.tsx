import React, { FC, ReactElement } from "react";

import { GiphyDataProps } from "../../../types/tweet";
import { useGifImageStyles } from "./GifImageStyles";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { CloseIcon } from "../../../icons";

interface GifImageProps {
    gif: GiphyDataProps;
    onClickRemoveGif: () => void;
}

const GifImage: FC<GifImageProps> = ({ gif, onClickRemoveGif }): ReactElement => {
    const classes = useGifImageStyles();

    return (
        <div className={classes.gif}>
            <img src={gif.images.downsized.url} alt={gif.id} />
            <div className={classes.gifRemove}>
                <ActionIconButton
                    actionText={"Remove"}
                    icon={CloseIcon}
                    onClick={onClickRemoveGif}
                    size={"medium"}
                />
            </div>
        </div>
    );
};

export default GifImage;
