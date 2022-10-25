import React, {ChangeEvent, FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {Typography} from "@material-ui/core";
import {EmojiData} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import EmojiConvertor from 'emoji-js';

import {
    addPoll,
    addQuoteTweet,
    addScheduledTweet,
    addTweet,
    updateScheduledTweet,
} from "../../store/ducks/tweets/actionCreators";
import UploadImages from '../UploadImages/UploadImages';
import {uploadImage} from "../../util/uploadImage";
import {selectUserData} from "../../store/ducks/user/selectors";
import {fetchReplyTweet} from "../../store/ducks/tweet/actionCreators";
import {useAddTweetFormStyles} from "./AddTweetFormStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {CloseIcon, GifIcon, PullIcon, ScheduleIcon} from "../../icons";
import Poll from "./Poll/Poll";
import Reply from "./Reply/Reply";
import Quote from "../Quote/Quote";
import {formatScheduleDate} from "../../util/formatDate";
import {useGlobalStyles} from "../../util/globalClasses";
import {QuoteTweetResponse, TweetResponse} from "../../store/types/tweet";
import {Image, ReplyType} from "../../store/types/common";
import {MODAL, PROFILE} from "../../util/pathConstants";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import {setOpenSnackBar} from "../../store/ducks/actionSnackbar/actionCreators";
import EmojiIconButton from "./EmojiIconButton/EmojiIconButton";
import ScheduleIconButton from "./ScheduleIconButton/ScheduleIconButton";

export interface AddTweetFormProps {
    unsentTweet?: TweetResponse;
    quoteTweet?: QuoteTweetResponse;
    maxRows?: number;
    minRows?: number;
    tweetId?: number;
    title: string;
    buttonName: string;
    addressedUsername?: string;
    addressedId?: number;
    onCloseModal?: () => void;
}

export interface ImageObj {
    src: string;
    file: File;
}

const MAX_LENGTH = 280;

const AddTweetForm: FC<AddTweetFormProps> = (
    {
        unsentTweet,
        quoteTweet,
        maxRows,
        minRows,
        tweetId,
        title,
        buttonName,
        addressedUsername,
        addressedId,
        onCloseModal
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const userData = useSelector(selectUserData);
    const [text, setText] = useState<string>("");
    const [images, setImages] = useState<ImageObj[]>([]);
    const [replyType, setReplyType] = useState<ReplyType>(ReplyType.EVERYONE);
    const [selectedScheduleDate, setSelectedScheduleDate] = useState<Date | null>(null);
    // Poll
    const [visiblePoll, setVisiblePoll] = useState<boolean>(false);
    const [choice1, setChoice1] = useState<string>("");
    const [choice2, setChoice2] = useState<string>("");
    const [choice3, setChoice3] = useState<string>("");
    const [choice4, setChoice4] = useState<string>("");
    const [day, setDay] = useState<number>(1);
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);

    const classes = useAddTweetFormStyles({quoteTweet: quoteTweet, isScheduled: selectedScheduleDate !== null});
    const textLimitPercent = Math.round((text.length / 280) * 100);
    const textCount = MAX_LENGTH - text.length;

    useEffect(() => {
        if (unsentTweet) {
            setText(unsentTweet.text);
            setSelectedScheduleDate(new Date(unsentTweet.scheduledDate!));
            if (unsentTweet.images?.length !== 0) {
                const newImages = [...images];
                const newImage = {...images[0]};
                newImage.src = unsentTweet.images![0].src;
                newImages[0] = newImage;
                setImages(newImages);
            }
        }
    }, [unsentTweet]);

    const handleChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setText(event.target.value);
    };

    const addEmoji = useCallback((emoji: EmojiData): void => {
        const emojiConvertor = new EmojiConvertor();
        emojiConvertor.replace_mode = 'unified';
        const convertedEmoji = emojiConvertor.replace_colons(emoji.colons!);
        setText(text + " " + convertedEmoji);
    }, []);

    const handleClickAddTweet = async (): Promise<void> => {
        const pollDateTime = (day * 1440) + (hour * 60) + minute;
        const choices = [choice1, choice2, choice3, choice4].filter(item => item);
        const result: Array<Image> = [];

        for (let i = 0; i < images.length; i++) {
            const file: File = images[i].file;
            const image: Image = await uploadImage(file);
            result.push(image);
        }

        if (visiblePoll) {
            dispatch(addPoll({
                text: textConverter(),
                images: result,
                pollDateTime: pollDateTime,
                choices: choices,
                replyType: replyType
            }));
        } else if (selectedScheduleDate !== null && unsentTweet === undefined) {
            dispatch(addScheduledTweet({
                text: textConverter(),
                images: result,
                replyType: replyType,
                scheduledDate: selectedScheduleDate
            }));
        } else if (unsentTweet) {
            dispatch(updateScheduledTweet({
                id: unsentTweet?.id,
                text: textConverter(),
                images: result,
                replyType: replyType,
            }));
            if (onCloseModal) onCloseModal();
        } else {
            dispatch(addTweet({
                text: textConverter(),
                images: result,
                replyType: replyType
            }));
        }
        dispatch(setOpenSnackBar(selectedScheduleDate ? (
            `Your Tweet will be sent on ${formatScheduleDate(selectedScheduleDate)}`
        ) : (
            "Your tweet was sent."
        )));
        setText('');
        setImages([]);
        setVisiblePoll(false);
        setSelectedScheduleDate(null);
    };

    const handleClickQuoteTweet = async (): Promise<void> => {
        let result: Array<Image> = [];

        for (let i = 0; i < images.length; i++) {
            const file: File = images[i].file;
            const image: Image = await uploadImage(file);
            result.push(image);
        }

        dispatch(addQuoteTweet({
            text: textConverter(),
            images: result,
            replyType: replyType,
            tweetId: quoteTweet!.id,
        }));

        dispatch(setOpenSnackBar("Your tweet was sent."));
        setText("");
        setImages([]);

        if (onCloseModal) onCloseModal();
    };

    const handleClickReplyTweet = async (): Promise<void> => {
        let result: Array<Image> = [];

        for (let i = 0; i < images.length; i++) {
            const file: File = images[i].file;
            const image: Image = await uploadImage(file);
            result.push(image);
        }

        dispatch(fetchReplyTweet({
            tweetId: tweetId!,
            text: textConverter(),
            addressedUsername: addressedUsername!,
            addressedId: addressedId!,
            images: result,
            replyType: replyType
        }));

        dispatch(setOpenSnackBar("Your tweet was sent."));
        setText("");
        setImages([]);

        if (onCloseModal) onCloseModal();
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

    const handleScheduleDate = useCallback((date: Date): void => {
        setSelectedScheduleDate(date);
        onClosePoll();
    }, []);

    const clearScheduleDate = useCallback((): void => {
        setSelectedScheduleDate(null);
    }, []);

    return (
        <>
            <div className={classes.content}>
                <Link to={`${PROFILE}/${userData?.id}`}>
                    <Avatar
                        className={globalClasses.avatar}
                        alt={`avatar ${userData?.id}`}
                        src={userData?.avatar?.src ? userData?.avatar?.src : DEFAULT_PROFILE_IMG}
                    />
                </Link>
                <div className={classes.textareaWrapper}>
                    {selectedScheduleDate && (
                        <div id={"tweetScheduleDate"} className={classes.infoWrapper}>
                            {ScheduleIcon}
                            <Typography variant={"subtitle2"} component={"span"}>
                                {`Will send on ${formatScheduleDate(selectedScheduleDate)}`}
                            </Typography>
                        </div>
                    )}
                    <TextareaAutosize
                        onChange={handleChangeTextarea}
                        className={classes.contentTextarea}
                        placeholder={visiblePoll ? "Ask a question..." : title}
                        value={text}
                        maxRows={maxRows}
                        minRows={images.length !== 0 ? 1 : minRows}
                    />
                </div>
            </div>
            {(images.length !== 0) && (
                <div className={(location.pathname.includes(MODAL)) ? classes.imageSmall : classes.image}>
                    <img src={images[0].src} alt={images[0].src}/>
                    <div className={classes.imageRemove}>
                        <ActionIconButton
                            actionText={"Remove"}
                            icon={CloseIcon}
                            onClick={removeImage}
                            size={"medium"}
                        />
                    </div>
                </div>
            )}
            {quoteTweet && (<Quote quoteTweet={quoteTweet}/>)}
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
            <Reply
                replyType={replyType}
                setReplyType={setReplyType}
                isUnsentTweet={!!unsentTweet}
            />
            <div className={classes.footer}>
                <div className={classes.footerWrapper}>
                    <UploadImages onChangeImages={setImages}/>
                    <ActionIconButton actionText={"GIF"} icon={GifIcon} size={"medium"}/>
                    {(buttonName !== "Reply") && (
                        <div className={classes.quoteImage}>
                            <ActionIconButton
                                actionText={"Poll"}
                                icon={PullIcon}
                                onClick={onOpenPoll}
                                disabled={!!quoteTweet || selectedScheduleDate !== null}
                                size={"medium"}
                            />
                        </div>
                    )}
                    <EmojiIconButton addEmoji={addEmoji}/>
                    {(buttonName !== "Reply") && (
                        <ScheduleIconButton
                            disabled={!!quoteTweet}
                            selectedScheduleDate={selectedScheduleDate}
                            handleScheduleDate={handleScheduleDate}
                            clearScheduleDate={clearScheduleDate}
                        />
                    )}
                </div>
                <div className={classes.footerAddForm}>
                    {text && (
                        <>
                            <span id={"textCount"}>{textCount}</span>
                            <div className={classes.footerAddFormCircleProgress}>
                                <CircularProgress
                                    variant="determinate"
                                    size={20}
                                    thickness={5}
                                    value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                                    style={text.length >= MAX_LENGTH ? {color: 'red'} : undefined}
                                />
                                <CircularProgress
                                    style={{color: "rgba(0, 0, 0, 0.1)"}}
                                    variant="determinate"
                                    size={20}
                                    thickness={5}
                                    value={100}
                                />
                            </div>
                        </>
                    )}
                    <Button
                        onClick={(buttonName === "Reply") ? handleClickReplyTweet :
                            (quoteTweet !== undefined ? handleClickQuoteTweet : handleClickAddTweet)}
                        disabled={
                            visiblePoll ? (
                                !choice1 || !choice2 || !text || text.length >= MAX_LENGTH
                            ) : (
                                !text || text.length >= MAX_LENGTH
                            )}
                        color="primary"
                        variant="contained"
                    >
                        {buttonName}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AddTweetForm;
