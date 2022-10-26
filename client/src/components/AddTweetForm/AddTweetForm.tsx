import React, {ChangeEvent, FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
import {fetchReplyTweet} from "../../store/ducks/tweet/actionCreators";
import {useAddTweetFormStyles} from "./AddTweetFormStyles";
import {GifIcon, PullIcon} from "../../icons";
import Poll, {PollInitialState, pollInitialState} from "./Poll/Poll";
import Reply from "./Reply/Reply";
import Quote from "../Quote/Quote";
import {formatScheduleDate} from "../../util/formatDate";
import {QuoteTweetResponse, TweetResponse} from "../../store/types/tweet";
import {Image, ReplyType} from "../../store/types/common";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import {setOpenSnackBar} from "../../store/ducks/actionSnackbar/actionCreators";
import EmojiIconButton from "./EmojiIconButton/EmojiIconButton";
import ScheduleIconButton from "./ScheduleIconButton/ScheduleIconButton";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import ScheduleDateInfo from "./ScheduleDateInfo/ScheduleDateInfo";
import AddTweetImage from "./AddTweetImage/AddTweetImage";

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
    const dispatch = useDispatch();
    const [text, setText] = useState<string>("");
    const [images, setImages] = useState<ImageObj[]>([]);
    const [replyType, setReplyType] = useState<ReplyType>(ReplyType.EVERYONE);
    const [selectedScheduleDate, setSelectedScheduleDate] = useState<Date | null>(null);
    const [visiblePoll, setVisiblePoll] = useState<boolean>(false);
    const [pollData, setPollData] = useState<PollInitialState>(pollInitialState);
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
        const {day, hour, minute, choice1, choice2, choice3, choice4} = pollData;
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

    const removeImage = useCallback((): void => {
        setImages((prev) => prev.filter((obj) => obj.src !== images[0].src));
    }, [images]);

    const onOpenPoll = (): void => {
        setVisiblePoll(true);
    };

    const onClosePoll = (): void => {
        setPollData(pollInitialState);
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
                <ProfileAvatar/>
                <div className={classes.textareaWrapper}>
                    <ScheduleDateInfo selectedScheduleDate={selectedScheduleDate} classes={classes}/>
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
            <AddTweetImage classes={classes} images={images} removeImage={removeImage}/>
            {quoteTweet && <Quote quoteTweet={quoteTweet}/>}
            <Poll pollData={pollData} setPollData={setPollData} visiblePoll={visiblePoll} onClose={onClosePoll}/>
            <Reply replyType={replyType} setReplyType={setReplyType} isUnsentTweet={!!unsentTweet}/>
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
                                    style={text.length >= MAX_LENGTH ? {color: "red"} : undefined}
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
                                !pollData.choice1 || !pollData.choice2 || !text || text.length >= MAX_LENGTH
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
