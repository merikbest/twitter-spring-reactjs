import React, { FC, ReactElement } from "react";
import { ImageList, ImageListItem } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { useProfileImagesStyles } from "./ProfileImagesStyles";
import { selectImages } from "../../store/ducks/userProfile/selectors";
import { TweetImageResponse } from "../../types/tweet";
import { MODAL } from "../../constants/path-constants";

const ProfileImages: FC = (): ReactElement => {
    const location = useLocation();
    const tweetImages = useSelector(selectImages);
    const classes = useProfileImagesStyles({ dataSize: tweetImages.length });

    const convertData = (tweetImages: TweetImageResponse[]) => {
        return tweetImages.map((item, index) => {
            if (tweetImages.length === 2) {
                return { ...item, rows: 2, cols: 1 };
            } else if (tweetImages.length === 3) {
                if (index === 2) {
                    return { ...item, rows: 1, cols: 2 };
                } else {
                    return { ...item, rows: 1, cols: 1 };
                }
            } else if (tweetImages.length === 4) {
                return { ...item, rows: 1, cols: 1 };
            } else if (tweetImages.length === 5) {
                if (index === 4) {
                    return { ...item, rows: 1, cols: 2 };
                } else {
                    return { ...item, rows: 1, cols: 1 };
                }
            } else if (tweetImages.length === 6) {
                return { ...item, rows: 1, cols: 1 };
            }
        });
    };

    const showClass = (index: number) => {
        if (index === 0) {
            return classes.item1;
        } else if (index === 1) {
            return classes.item2;
        } else if (index === 2) {
            return classes.item3;
        } else if (index === 3) {
            return classes.item4;
        } else if (index === 4) {
            return classes.item5;
        } else if (index === 5) {
            return classes.item6;
        }
    };

    return (
        <>
            {(tweetImages.length === 1) ? null : (
                <div className={classes.container}>
                    <ImageList
                        className={classes.imageList}
                        gap={0}
                        rowHeight={90}
                        cols={(tweetImages.length <= 4) ? 2 : 3}
                    >
                        {convertData(tweetImages).map((item, index) => (
                            <ImageListItem
                                className={showClass(index)}
                                key={item?.tweetId}
                                cols={item?.cols || 1}
                                rows={item?.rows || 1}
                            >
                                <Link to={{ pathname: `${MODAL}/${item?.tweetId}`, state: { background: location } }}>
                                    <img className={classes.img} src={item?.src} alt={item?.src} />
                                </Link>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )}
        </>
    );
};

export default ProfileImages;
