import React, { FC, memo, ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGifImageStyles } from "./GifImageStyles";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import { CloseIcon } from "../../icons";
import { GifImageResponse } from "../../types/tweet";
import { HOME_TWEET } from "../../constants/path-constants";
import { removeGif } from "../../store/ducks/addTweetForm/actionCreators";

interface GifImageProps {
    tweetId?: number;
    gifImage?: GifImageResponse;
    removeButton?: boolean;
    withLink?: boolean;
}

interface WithLinkProps {
    children: ReactNode;
    withLink?: boolean;
    tweetId?: number;
}

const WithLink = ({ children, withLink, tweetId }: WithLinkProps) => (
    withLink
        ? <Link to={`${HOME_TWEET}/${tweetId}`}>{children}</Link>
        : <>{children}</>
);

const GifImage: FC<GifImageProps> = memo(({ tweetId, gifImage, removeButton, withLink }): ReactElement => {
    const classes = useGifImageStyles({ width: gifImage!.width, height: gifImage!.height });
    const dispatch = useDispatch();

    const onClickRemoveGif = (): void => {
        dispatch(removeGif());
    };

    return (
        <WithLink withLink={withLink} tweetId={tweetId}>
            <div className={classes.gif}>
                <img src={gifImage?.url} alt={""} />
                {removeButton && (
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
        </WithLink>

    );
});

export default GifImage;
