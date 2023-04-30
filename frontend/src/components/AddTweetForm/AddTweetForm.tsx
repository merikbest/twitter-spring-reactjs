import React, { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "emoji-mart/css/emoji-mart.css";

import {
    addPoll,
    addQuoteTweet,
    addScheduledTweet,
    addTweet,
    updateScheduledTweet
} from "../../store/ducks/tweets/actionCreators";
import UploadImages from "../UploadImages/UploadImages";
import { fetchReplyTweet } from "../../store/ducks/tweet/actionCreators";
import { useAddTweetFormStyles } from "./AddTweetFormStyles";
import { GifIcon, PullIcon } from "../../icons";
import Poll, { PollInitialState, pollInitialState } from "./Poll/Poll";
import Reply from "./Reply/Reply";
import Quote from "../Quote/Quote";
import { formatScheduleDate } from "../../util/format-date-helper";
import { QuoteTweetResponse, TweetResponse } from "../../types/tweet";
import { Image, ReplyType } from "../../types/common";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import { setOpenSnackBar } from "../../store/ducks/actionSnackbar/actionCreators";
import EmojiIconButton from "./EmojiIconButton/EmojiIconButton";
import ScheduleIconButton from "./ScheduleIconButton/ScheduleIconButton";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import ScheduleDateInfo from "./ScheduleDateInfo/ScheduleDateInfo";
import AddTweetImage from "./AddTweetImage/AddTweetImage";
import { useParams } from "react-router-dom";
import { TweetApi } from "../../services/api/tweet-service/tweetApi";
import { useSelectUsers } from "../../hook/useSelectUsers";
import { useInputText } from "../../hook/useInputText";

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
    const params = useParams<{ userId: string }>();
    const [images, setImages] = useState<ImageObj[]>([]);
    const [replyType, setReplyType] = useState<ReplyType>(ReplyType.EVERYONE);
    const [selectedScheduleDate, setSelectedScheduleDate] = useState<Date | null>(null);
    const [visiblePoll, setVisiblePoll] = useState<boolean>(false);
    const [pollData, setPollData] = useState<PollInitialState>(pollInitialState);
    const [imageDescription, setImageDescription] = useState<string>("");
    const { text, setText, handleChangeText, addEmoji, textConverter } = useInputText();
    const { selectedUsers, handleDelete, handleListItemClick, resetSelectedUsers } = useSelectUsers();
    const classes = useAddTweetFormStyles({ quoteTweet: quoteTweet, isScheduled: selectedScheduleDate !== null });
    const textLimitPercent = Math.round((text.length / MAX_LENGTH) * 100);
    const textCount = MAX_LENGTH - text.length;

    useEffect(() => {
        if (unsentTweet) {
            setText(unsentTweet.text);
            setSelectedScheduleDate(new Date(unsentTweet.scheduledDate!));
            if (unsentTweet.images?.length !== 0) {
                const newImages = [...images];
                const newImage = { ...images[0] };
                newImage.src = unsentTweet.images![0].src;
                newImages[0] = newImage;
                setImages(newImages);
            }
        }
    }, [unsentTweet]);

    const handleClickAddTweet = async (): Promise<void> => {
        const tweet = await tweetPreProcessing();

        if (visiblePoll) {
            const { day, hour, minute, choice1, choice2, choice3, choice4 } = pollData;
            const pollDateTime = (day * 1440) + (hour * 60) + minute;
            const choices = [choice1, choice2, choice3, choice4].filter(item => item);
            dispatch(addPoll({ ...tweet, pollDateTime, choices }));
        } else if (selectedScheduleDate !== null && unsentTweet === undefined) {
            dispatch(addScheduledTweet({ ...tweet, scheduledDate: selectedScheduleDate }));
        } else if (unsentTweet) {
            dispatch(updateScheduledTweet({ ...tweet, id: unsentTweet?.id }));
            if (onCloseModal) onCloseModal();
        } else {
            dispatch(addTweet(tweet));
        }
        tweetPostProcessing(selectedScheduleDate ? (
            `Your Tweet will be sent on ${formatScheduleDate(selectedScheduleDate)}`
        ) : (
            "Your tweet was sent."
        ));
    };

    const handleClickQuoteTweet = async (): Promise<void> => {
        const tweet = await tweetPreProcessing();
        dispatch(addQuoteTweet({ ...tweet, tweetId: quoteTweet!.id, userId: params.userId }));
        tweetPostProcessing("Your tweet was sent.");
    };

    const handleClickReplyTweet = async (): Promise<void> => {
        const tweet = await tweetPreProcessing();
        dispatch(fetchReplyTweet({
            ...tweet,
            tweetId: tweetId!,
            userId: params.userId,
            addressedUsername: addressedUsername!,
            addressedId: addressedId!,
        }));
        tweetPostProcessing("Your tweet was sent.");
    };

    const tweetPreProcessing = async () => {
        let result: Array<Image> = [];

        for (const image of images) {
            const formData = new FormData();
            formData.append("file", image.file);
            const { data } = await TweetApi.uploadTweetImage(formData);
            result.push(data);
        }
        const taggedImageUsers = selectedUsers.map((user) => user.id);
        return { text: textConverter(), images: result, imageDescription, taggedImageUsers, replyType };
    };

    const tweetPostProcessing = (snackBarText: string): void => {
        dispatch(setOpenSnackBar(snackBarText));
        setText("");
        setImages([]);
        setImageDescription("");
        resetSelectedUsers();
        setVisiblePoll(false);
        setPollData(pollInitialState);
        setSelectedScheduleDate(null);
        if (onCloseModal) onCloseModal();
    };

    const removeImage = useCallback((): void => {
        setImages((prev) => prev.filter((obj) => obj.src !== images[0].src));
        setImageDescription("");
        resetSelectedUsers();
    }, [images]);

    const handleChangeDescription = useCallback((description: string): void => {
        setImageDescription(description);
    }, [imageDescription]);

    const onOpenPoll = useCallback((): void => {
        setVisiblePoll(true);
    }, []);

    const onClosePoll = useCallback((): void => {
        setPollData(pollInitialState);
        setVisiblePoll(false);
    }, []);

    const onChangePoll = useCallback((pollState: PollInitialState): void => {
        setPollData(prevState => ({ ...prevState, ...pollState }));
    }, [pollData]);

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
                <ProfileAvatar />
                <div className={classes.textareaWrapper}>
                    <ScheduleDateInfo selectedScheduleDate={selectedScheduleDate} />
                    <TextareaAutosize
                        onChange={handleChangeText}
                        className={classes.contentTextarea}
                        placeholder={visiblePoll ? "Ask a question..." : title}
                        value={text}
                        maxRows={maxRows}
                        minRows={images.length !== 0 ? 1 : minRows}
                    />
                </div>
            </div>
            <AddTweetImage
                images={images}
                removeImage={removeImage}
                imageDescription={imageDescription}
                handleChangeDescription={handleChangeDescription}
                selectedUsers={selectedUsers}
                handleDelete={handleDelete}
                handleListItemClick={handleListItemClick}
            />
            {quoteTweet && <Quote quoteTweet={quoteTweet} />}
            <Poll pollData={pollData} onChangePoll={onChangePoll} visiblePoll={visiblePoll} onClose={onClosePoll} />
            <Reply replyType={replyType} setReplyType={setReplyType} isUnsentTweet={!!unsentTweet} />
            <div className={classes.footer}>
                <div className={classes.footerWrapper}>
                    <UploadImages onChangeImages={setImages} />
                    <ActionIconButton actionText={"GIF"} icon={GifIcon} size={"medium"} />
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
                    <EmojiIconButton addEmoji={addEmoji} />
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
                                    style={text.length >= MAX_LENGTH ? { color: "red" } : undefined}
                                />
                                <CircularProgress
                                    style={{ color: "rgba(0, 0, 0, 0.1)" }}
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
