import React, {FC, ReactElement} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {Alert} from "@material-ui/lab";

import {useDispatch, useSelector} from "react-redux";
import {fetchAddTweet, setAddFormState} from "../../store/ducks/tweets/actionCreators";
import {selectAddFormState} from "../../store/ducks/tweets/selectors";
import {AddFormState, Image} from '../../store/ducks/tweets/contracts/state';
import UploadImages from '../UploadImages/UploadImages';
import {uploadImage} from "../../util/uploadImage";
import {selectUserData} from "../../store/ducks/user/selectors";
import {fetchReplyTweet} from "../../store/ducks/tweet/actionCreators";
import {useAddTweetFormStyles} from "./AddTweetFormStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {IconButton} from "@material-ui/core";
import {EmojiIcon, GifIcon, PullIcon, ScheduleIcon} from "../../icons";

interface AddTweetFormProps {
    maxRows?: number;
    tweetId?: string;
    title: string;
    buttonName: string;
    addressedUsername?: string;
}

export interface ImageObj {
    src: string;
    file: File;
}

const MAX_LENGTH = 280;

export const AddTweetForm: FC<AddTweetFormProps> = ({
                                                        maxRows,
                                                        tweetId,
                                                        title,
                                                        buttonName,
                                                        addressedUsername
                                                    }: AddTweetFormProps): ReactElement => {
    const classes = useAddTweetFormStyles();
    const dispatch = useDispatch();
    const addFormState = useSelector(selectAddFormState);
    const userData = useSelector(selectUserData);
    const [text, setText] = React.useState<string>('');
    const [images, setImages] = React.useState<ImageObj[]>([]);

    const textLimitPercent = Math.round((text.length / 280) * 100);
    const textCount = MAX_LENGTH - text.length;

    const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>): void => {
        if (e.currentTarget) {
            setText(e.currentTarget.value);
        }
    };

    const handleClickAddTweet = async (): Promise<void> => {
        let result: Array<Image> = [];
        dispatch(setAddFormState(AddFormState.LOADING));
        for (let i = 0; i < images.length; i++) {
            const file: File = images[i].file;
            const image: Image = await uploadImage(file);
            result.push(image);
        }

        dispatch(fetchAddTweet({
            text: parseHashtags(text), images: result, likes: [], retweets: []
        }));
        setText('');
        setImages([]);
    };

    const handleClickReplyTweet = (): void => {
        if (addressedUsername) {
            dispatch(fetchReplyTweet({
                id: tweetId!, text: parseHashtags(text), addressedUsername, images: [], likes: [], retweets: []
            }));
            setText("");
        }
    };

    const parseHashtags = (text: string): string => {
        return text.replace(/(#\w+)\b/ig, (hashtag) => `<b id="hashtag">${hashtag}</b>`);
    };

    return (
        <div>
            <div className={classes.content}>
                <Avatar
                    className={classes.contentAvatar}
                    alt={`avatar ${userData?.user.id}`}
                    src={userData?.user.avatar?.src ? userData?.user.avatar?.src : DEFAULT_PROFILE_IMG}
                />
                <TextareaAutosize
                    onChange={handleChangeTextarea}
                    className={classes.contentTextarea}
                    placeholder={title}
                    value={text}
                    rowsMax={maxRows}
                />
            </div>
            <div className={classes.footer}>
                <div className={classes.footerWrapper}>
                    <UploadImages images={images} onChangeImages={setImages}/>
                    <div className={classes.footerImage}>
                        <IconButton color="primary">
                            <span>{GifIcon}</span>
                        </IconButton>
                    </div>
                    {(buttonName !== "Reply") && (
                        <div className={classes.footerImage}>
                            <IconButton color="primary">
                                <span>{PullIcon}</span>
                            </IconButton>
                        </div>)
                    }
                    <div className={classes.footerImage}>
                        <IconButton color="primary">
                            <span>{EmojiIcon}</span>
                        </IconButton>
                    </div>
                    {(buttonName !== "Reply") && (
                        <div className={classes.footerImage}>
                            <IconButton color="primary">
                                <span>{ScheduleIcon}</span>
                            </IconButton>
                        </div>)
                    }
                </div>
                <div className={classes.footerAddForm}>
                    {text && (
                        <>
                            <span>{textCount}</span>
                            <div className={classes.footerAddFormCircleProgress}>
                                <CircularProgress
                                    variant="static"
                                    size={20}
                                    thickness={5}
                                    value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                                    style={text.length >= MAX_LENGTH ? {color: 'red'} : undefined}
                                />
                                <CircularProgress
                                    style={{color: 'rgba(0, 0, 0, 0.1)'}}
                                    variant="static"
                                    size={20}
                                    thickness={5}
                                    value={100}
                                />
                            </div>
                        </>
                    )}
                    <Button
                        onClick={buttonName === "Tweet" ? handleClickAddTweet : handleClickReplyTweet}
                        disabled={addFormState === AddFormState.LOADING || !text || text.length >= MAX_LENGTH}
                        color="primary"
                        variant="contained">
                        {addFormState === AddFormState.LOADING ? (
                            <CircularProgress color="inherit" size={16}/>
                        ) : (
                            buttonName
                        )}
                    </Button>
                </div>
            </div>
            {addFormState === AddFormState.ERROR && (
                <Alert severity="error">
                    Error{' '}
                    <span aria-label="emoji-plak" role="img">😞</span>
                </Alert>
            )}
        </div>
    );
};
