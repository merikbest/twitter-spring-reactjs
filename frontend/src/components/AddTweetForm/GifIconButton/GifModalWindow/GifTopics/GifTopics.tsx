import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageList, ImageListItem, ImageListItemBar, Typography } from "@material-ui/core";

import { useGifModalWindowStyles } from "../GifModalWindowStyles";
import { fetchGifImages, resetLocalizationState } from "../../../../../store/ducks/localization/actionCreators";
import { selectGifImages, selectIsLocalizationLoading } from "../../../../../store/ducks/localization/selectors";
import Spinner from "../../../../Spinner/Spinner";

interface GifTopicsProps {
    onClickGifTopic: (topic: string) => void;
}

const GifTopics: FC<GifTopicsProps> = ({ onClickGifTopic }): ReactElement => {
    const classes = useGifModalWindowStyles();
    const dispatch = useDispatch();
    const gifImages = useSelector(selectGifImages);
    const gifImagesLoading = useSelector(selectIsLocalizationLoading);

    useEffect(() => {
        dispatch(fetchGifImages());

        return () => {
            dispatch(resetLocalizationState());
        };
    }, []);

    return (
        <ImageList cols={2} rowHeight={150}>
            {gifImagesLoading ? (
                <Spinner />
            ) : (
                gifImages.map((gif) => (
                    <ImageListItem
                        key={gif.id}
                        className={classes.imageListItem}
                        onClick={() => onClickGifTopic(gif.title)}
                    >
                        <img alt={gif.title} src={gif.src} />
                        <ImageListItemBar title={
                            <Typography variant={"h5"} component={"div"}>{gif.title}</Typography>
                        } />
                    </ImageListItem>
                ))
            )}
        </ImageList>
    );
};

export default GifTopics;
