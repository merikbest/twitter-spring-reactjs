import React, {FC, FormEvent, MouseEvent, ReactElement, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {IconButton, Popover} from "@material-ui/core";
import {EmojiData, Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import EmojiConvertor from 'emoji-js';

import {fetchAddTweet, setTweetsLoadingState} from "../../store/ducks/tweets/actionCreators";
import {selectIsTweetsLoading} from "../../store/ducks/tweets/selectors";
import {Image} from '../../store/ducks/tweets/contracts/state';
import UploadImages from '../UploadImages/UploadImages';
import {uploadImage} from "../../util/uploadImage";
import {selectUserData} from "../../store/ducks/user/selectors";
import {fetchReplyTweet, setTweetLoadingState} from "../../store/ducks/tweet/actionCreators";
import {useAddTweetFormStyles} from "./AddTweetFormStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {CloseIcon, EmojiIcon, GifIcon, PullIcon, ScheduleIcon} from "../../icons";
import {selectIsTweetLoading} from "../../store/ducks/tweet/selectors";
import {LoadingStatus} from "../../store/types";

interface AddTweetFormProps {
    maxRows?: number;
    minRows?: number;
    tweetId?: string;
    title: string;
    buttonName: string;
    addressedUsername?: string;
    addressedId?: number;
}

export interface ImageObj {
    src: string;
    file: File;
}

const MAX_LENGTH = 280;

export const AddTweetForm: FC<AddTweetFormProps> = ({
                                                        maxRows,
                                                        minRows,
                                                        tweetId,
                                                        title,
                                                        buttonName,
                                                        addressedUsername,
                                                        addressedId
                                                    }): ReactElement => {
    const classes = useAddTweetFormStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const isTweetsLoading = useSelector(selectIsTweetsLoading);
    const isReplyLoading = useSelector(selectIsTweetLoading);
    const userData = useSelector(selectUserData);
    const [text, setText] = useState<string>('');
    const [images, setImages] = useState<ImageObj[]>([]);
    const isModal = location.pathname.includes("/modal");
    const textLimitPercent = Math.round((text.length / 280) * 100);
    const textCount = MAX_LENGTH - text.length;
    // Popover
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleChangeTextarea = (e: FormEvent<HTMLTextAreaElement>): void => {
        if (e.currentTarget) {
            setText(e.currentTarget.value);
        }
    };

    const addEmoji = (emoji: EmojiData): void => {
        const emojiConvertor = new EmojiConvertor();
        emojiConvertor.replace_mode = 'unified';
        const convertedEmoji = emojiConvertor.replace_colons(emoji.colons!);
        setText(text + " " + convertedEmoji);
    };

    const handleClickAddTweet = async (): Promise<void> => {
        let result: Array<Image> = [];
        const profileId = parseInt(location.pathname.substring(location.pathname.length - 1));

        dispatch(setTweetsLoadingState(LoadingStatus.LOADING));
        for (let i = 0; i < images.length; i++) {
            const file: File = images[i].file;
            const image: Image = await uploadImage(file);
            result.push(image);
        }

        dispatch(fetchAddTweet({profileId: profileId, text: textConverter(), images: result,}));
        setText('');
        setImages([]);
    };

    const handleClickReplyTweet = async (): Promise<void> => {
        let result: Array<Image> = [];
        dispatch(setTweetLoadingState(LoadingStatus.LOADING));
        for (let i = 0; i < images.length; i++) {
            const file: File = images[i].file;
            const image: Image = await uploadImage(file);
            result.push(image);
        }

        dispatch(fetchReplyTweet({
            id: tweetId!,
            text: textConverter(),
            addressedUsername: addressedUsername!,
            addressedId: addressedId!,
            images: result,
        }));
        setText("");
        setImages([]);
    };

    const handleOpenPopup = (event: MouseEvent<HTMLDivElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = (): void => {
        setAnchorEl(null);
    };

    const textConverter = (): string => {
        const emojiConvertor = new EmojiConvertor();
        emojiConvertor.colons_mode = true;
        return emojiConvertor.replace_unified(text);
    };

    const removeImage = (): void => {
        setImages((prev) => prev.filter((obj) => obj.src !== images[0].src));
    };

    return (
        <div>
            <div className={classes.content}>
                <Avatar
                    className={classes.contentAvatar}
                    alt={`avatar ${userData?.id}`}
                    src={userData?.avatar?.src ? userData?.avatar?.src : DEFAULT_PROFILE_IMG}
                />
                <TextareaAutosize
                    onChange={handleChangeTextarea}
                    className={classes.contentTextarea}
                    placeholder={title}
                    value={text}
                    rowsMax={maxRows}
                    rowsMin={images.length !== 0 ? 1 : minRows}
                />
            </div>
            {(images.length !== 0) && (
                <div className={(location.pathname.includes("/modal")) ? classes.imageSmall : classes.image}>
                    <img src={images[0].src} alt={images[0].src}/>
                    <IconButton onClick={removeImage} className={classes.imageRemove}>
                        {CloseIcon}
                    </IconButton>
                </div>)
            }
            <div className={classes.footer}>
                <div className={classes.footerWrapper}>
                    <UploadImages onChangeImages={setImages}/>
                    <div className={classes.footerImage}>
                        <IconButton color="primary">
                            <span>{GifIcon}</span>
                        </IconButton>
                    </div>
                    {(!isModal) && (
                        <div className={classes.footerImage}>
                            <IconButton color="primary">
                                <span>{PullIcon}</span>
                            </IconButton>
                        </div>)
                    }
                    <div onClick={handleOpenPopup} className={classes.footerImage}>
                        <IconButton color="primary">
                            <span>{EmojiIcon}</span>
                        </IconButton>
                    </div>
                    {(!isModal) && (
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
                        disabled={isTweetsLoading || isReplyLoading || !text || text.length >= MAX_LENGTH}
                        color="primary"
                        variant="contained">
                        {isTweetsLoading || isReplyLoading ? (
                            <CircularProgress color="inherit" size={16}/>
                        ) : (
                            buttonName
                        )}
                    </Button>
                </div>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClosePopup}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}
                    transformOrigin={{vertical: 'top', horizontal: 'center',}}
                >
                    <Picker
                        title=''
                        emoji='wave'
                        onSelect={emojiTag => addEmoji(emojiTag)}
                        set={'twitter'}/>
                </Popover>
            </div>
        </div>
    );
};
