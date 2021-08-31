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

import {fetchAddPoll, fetchAddTweet, setTweetsLoadingState} from "../../store/ducks/tweets/actionCreators";
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
import Poll from "./Poll/Poll";
import Reply from "./Reply/Reply";

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
    // Poll
    const [visiblePoll, setVisiblePoll] = useState<boolean>(false);
    const [choice1, setChoice1] = useState<string>("");
    const [choice2, setChoice2] = useState<string>("");
    const [choice3, setChoice3] = useState<string>("");
    const [choice4, setChoice4] = useState<string>("");
    const [day, setDay] = useState<number>(1);
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);

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
        const pollDateTime = (day * 1440) + (hour * 60) + minute;
        const choices = [choice1, choice2, choice3, choice4].filter(item => item);
        const result: Array<Image> = [];
        const profileId = parseInt(location.pathname.substring(location.pathname.length - 1));

        dispatch(setTweetsLoadingState(LoadingStatus.LOADING));
        for (let i = 0; i < images.length; i++) {
            const file: File = images[i].file;
            const image: Image = await uploadImage(file);
            result.push(image);
        }

        if (visiblePoll) {
            dispatch(fetchAddPoll({
                profileId: profileId,
                text: textConverter(),
                images: result,
                pollDateTime: pollDateTime,
                choices: choices
            }));
        } else {
            dispatch(fetchAddTweet({
                profileId: profileId,
                text: textConverter(),
                images: result
            }));
        }

        setText('');
        setImages([]);
        setVisiblePoll(false);
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

    const onOpenPoll = (): void => {
        setVisiblePoll(true);
    };

    const onClosePoll = (): void => {
        setChoice1("");
        setChoice2("");
        setChoice3("");
        setChoice4("");
        setDay(1);
        setHour(0);
        setMinute(0);
        setVisiblePoll(false);
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
                    placeholder={visiblePoll ? "Ask a question..." : title}
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
            <Poll
                choice1={choice1}
                choice2={choice2}
                choice3={choice3}
                choice4={choice4}
                setChoice1={setChoice1}
                setChoice2={setChoice2}
                setChoice3={setChoice3}
                setChoice4={setChoice4}
                day={day}
                hour={hour}
                minute={minute}
                setDay={setDay}
                setHour={setHour}
                setMinute={setMinute}
                visiblePoll={visiblePoll}
                onClose={onClosePoll}
            />
            <Reply/>
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
                            <IconButton onClick={onOpenPoll} color="primary">
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
                        disabled={
                            visiblePoll ? (
                                !choice1 || !choice2 || !text || text.length >= MAX_LENGTH
                            ) : (
                                isTweetsLoading || isReplyLoading || !text || text.length >= MAX_LENGTH
                            )}
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
