import React, {FC, FormEvent, MouseEvent, ReactElement, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {IconButton, Popover, Typography} from "@material-ui/core";
import {EmojiData, Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import EmojiConvertor from 'emoji-js';

import {
    addPoll,
    addQuoteTweet,
    addScheduledTweet,
    addTweet,
    updateScheduledTweet,
} from "../../store/ducks/tweets/actionCreators";
import {selectIsTweetsLoading} from "../../store/ducks/tweets/selectors";
import {Image, ReplyType, Tweet} from '../../store/ducks/tweets/contracts/state';
import UploadImages from '../UploadImages/UploadImages';
import {uploadImage} from "../../util/uploadImage";
import {selectUserData} from "../../store/ducks/user/selectors";
import {fetchReplyTweet} from "../../store/ducks/tweet/actionCreators";
import {useAddTweetFormStyles} from "./AddTweetFormStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {CloseIcon, EmojiIcon, GifIcon, PullIcon, ScheduleIcon} from "../../icons";
import {selectIsTweetLoading} from "../../store/ducks/tweet/selectors";
import Poll from "./Poll/Poll";
import Reply from "./Reply/Reply";
import Quote from "../Quote/Quote";
import HoverAction from "../HoverAction/HoverAction";
import ScheduleModal from "./ScheduleModal/ScheduleModal";
import {formatScheduleDate} from "../../util/formatDate";
import UnsentTweetsModal from "./UnsentTweetsModal/UnsentTweetsModal";
import ActionSnackbar from "../ActionSnackbar/ActionSnackbar";
import {SnackbarProps, withSnackbar} from "../../hoc/withSnackbar";

export enum AddTweetFormAction {
    MEDIA = "MEDIA",
    GIF = "GIF",
    POLL = "POLL",
    EMOJI = "EMOJI",
    SCHEDULE = "SCHEDULE"
}

export interface AddTweetFormProps {
    unsentTweet?: Tweet;
    quoteTweet?: Tweet;
    maxRows?: number;
    minRows?: number;
    tweetId?: string;
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
const HOVER_DELAY = 500;

const AddTweetForm: FC<AddTweetFormProps & SnackbarProps> = (
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
        onCloseModal,
        snackBarMessage,
        openSnackBar,
        setSnackBarMessage,
        setOpenSnackBar,
        onCloseSnackBar
    }
): ReactElement => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isTweetsLoading = useSelector(selectIsTweetsLoading);
    const isReplyLoading = useSelector(selectIsTweetLoading);
    const userData = useSelector(selectUserData);

    const [text, setText] = useState<string>('');
    const [images, setImages] = useState<ImageObj[]>([]);
    const [replyType, setReplyType] = useState<ReplyType>(ReplyType.EVERYONE);
    const [visibleAddMediaAction, setVisibleAddMediaAction] = useState<boolean>(false);
    const [visibleAddGifAction, setVisibleAddGifAction] = useState<boolean>(false);
    const [visibleAddPollAction, setVisibleAddPollAction] = useState<boolean>(false);
    const [visibleAddEmojiAction, setVisibleAddEmojiAction] = useState<boolean>(false);
    const [visibleAddScheduleAction, setVisibleAddScheduleAction] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);
    const [visibleScheduleModal, setVisibleScheduleModal] = useState<boolean>(false);
    const [visibleUnsentTweetsModal, setVisibleUnsentTweetsModal] = useState<boolean>(false);
    const [selectedScheduleDate, setSelectedScheduleDate] = useState<Date | null>(null);
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

    const classes = useAddTweetFormStyles({quoteTweet, isScheduled: selectedScheduleDate !== null});
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

        setSnackBarMessage!(selectedScheduleDate ? (
            `Your Tweet will be sent on ${formatScheduleDate(selectedScheduleDate)}`
        ) : (
            "Your tweet was sent."
        ));
        setOpenSnackBar!(true);
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

        setSnackBarMessage!("Your tweet was sent.");
        setOpenSnackBar!(true);
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

        setSnackBarMessage!("Your tweet was sent.");
        setOpenSnackBar!(true);
        setText("");
        setImages([]);

        if (onCloseModal) onCloseModal();
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

    const handleHoverAction = (action: AddTweetFormAction): void => {
        if (action === AddTweetFormAction.MEDIA) {
            setDelayHandler(setTimeout(() => setVisibleAddMediaAction(true), HOVER_DELAY));
        } else if (action === AddTweetFormAction.GIF) {
            setDelayHandler(setTimeout(() => setVisibleAddGifAction(true), HOVER_DELAY));
        } else if (action === AddTweetFormAction.POLL) {
            setDelayHandler(setTimeout(() => setVisibleAddPollAction(true), HOVER_DELAY));
        } else if (action === AddTweetFormAction.EMOJI) {
            setDelayHandler(setTimeout(() => setVisibleAddEmojiAction(true), HOVER_DELAY));
        } else if (action === AddTweetFormAction.SCHEDULE) {
            setDelayHandler(setTimeout(() => setVisibleAddScheduleAction(true), HOVER_DELAY));
        }
    };

    const handleLeaveAction = (): void => {
        clearTimeout(delayHandler);
        setVisibleAddMediaAction(false);
        setVisibleAddGifAction(false);
        setVisibleAddPollAction(false);
        setVisibleAddEmojiAction(false);
        setVisibleAddScheduleAction(false);
    };

    const onOpenScheduleModal = (): void => {
        setVisibleScheduleModal(true);
    };

    const onCloseScheduleModal = (): void => {
        setVisibleScheduleModal(false);
    };

    const handleScheduleDate = (date: Date): void => {
        setSelectedScheduleDate(date);
        onClosePoll();
    };

    const clearScheduleDate = (): void => {
        setSelectedScheduleDate(null);
    };

    const onOpenUnsentTweetsModal = (): void => {
        setVisibleUnsentTweetsModal(true);
        setVisibleScheduleModal(false);
    };

    const onCloseUnsentTweetsModal = (): void => {
        setVisibleScheduleModal(true);
        setVisibleUnsentTweetsModal(false);
    };

    return (
        <div>
            <div className={classes.content}>
                <Avatar
                    className={classes.contentAvatar}
                    alt={`avatar ${userData?.id}`}
                    src={userData?.avatar?.src ? userData?.avatar?.src : DEFAULT_PROFILE_IMG}
                />
                <div className={classes.textareaWrapper}>
                    {selectedScheduleDate && (
                        <div className={classes.infoWrapper}>
                            {ScheduleIcon}
                            <Typography component={"span"} className={classes.text}>
                                {`Will send on ${formatScheduleDate(selectedScheduleDate)}`}
                            </Typography>
                        </div>
                    )}
                    <TextareaAutosize
                        onChange={handleChangeTextarea}
                        className={classes.contentTextarea}
                        placeholder={visiblePoll ? "Ask a question..." : title}
                        value={text}
                        rowsMax={maxRows}
                        rowsMin={images.length !== 0 ? 1 : minRows}
                    />
                </div>
            </div>
            {(images.length !== 0) && (
                <div className={(location.pathname.includes("/modal")) ? classes.imageSmall : classes.image}>
                    <img src={images[0].src} alt={images[0].src}/>
                    <IconButton onClick={removeImage} className={classes.imageRemove}>
                        {CloseIcon}
                    </IconButton>
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
                    <UploadImages
                        onChangeImages={setImages}
                        visibleAddMediaAction={visibleAddMediaAction}
                        handleHoverAction={handleHoverAction}
                        handleLeaveAction={handleLeaveAction}
                    />
                    <div className={classes.footerImage}>
                        <IconButton
                            color="primary"
                            onMouseEnter={() => handleHoverAction(AddTweetFormAction.GIF)}
                            onMouseLeave={handleLeaveAction}
                        >
                            <>{GifIcon}</>
                            <HoverAction visible={visibleAddGifAction} actionText={"GIF"}/>
                        </IconButton>
                    </div>
                    {(buttonName !== "Reply") && (
                        <div className={classes.quoteImage}>
                            <IconButton
                                disabled={!!quoteTweet || selectedScheduleDate !== null}
                                onClick={onOpenPoll}
                                onMouseEnter={() => handleHoverAction(AddTweetFormAction.POLL)}
                                onMouseLeave={handleLeaveAction}
                                color="primary"
                            >
                                <>{PullIcon}</>
                                <HoverAction visible={visibleAddPollAction} actionText={"Poll"}/>
                            </IconButton>
                        </div>
                    )}
                    <div onClick={handleOpenPopup} className={classes.footerImage}>
                        <IconButton
                            onMouseEnter={() => handleHoverAction(AddTweetFormAction.EMOJI)}
                            onMouseLeave={handleLeaveAction}
                        >
                            <>{EmojiIcon}</>
                            <HoverAction visible={visibleAddEmojiAction} actionText={"Emoji"}/>
                        </IconButton>
                    </div>
                    {(buttonName !== "Reply") && (
                        <div className={classes.footerImage}>
                            <IconButton
                                disabled={!!quoteTweet}
                                onClick={onOpenScheduleModal}
                                onMouseEnter={() => handleHoverAction(AddTweetFormAction.SCHEDULE)}
                                onMouseLeave={handleLeaveAction}
                                color="primary"
                            >
                                <>{ScheduleIcon}</>
                                <HoverAction visible={visibleAddScheduleAction} actionText={"Schedule"}/>
                            </IconButton>
                        </div>
                    )}
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
                        onClick={(buttonName === "Reply") ? handleClickReplyTweet :
                            (quoteTweet !== undefined ? handleClickQuoteTweet : handleClickAddTweet)}
                        disabled={
                            visiblePoll ? (
                                !choice1 || !choice2 || !text || text.length >= MAX_LENGTH
                            ) : (
                                isTweetsLoading || isReplyLoading || !text || text.length >= MAX_LENGTH
                            )}
                        color="primary"
                        variant="contained"
                    >
                        {(isTweetsLoading || isReplyLoading) ? (
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
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    transformOrigin={{vertical: 'top', horizontal: 'center'}}
                >
                    <Picker
                        title=''
                        emoji='wave'
                        onSelect={emojiTag => addEmoji(emojiTag)}
                        set={'twitter'}/>
                </Popover>
                <ActionSnackbar
                    snackBarMessage={snackBarMessage!}
                    openSnackBar={openSnackBar!}
                    onCloseSnackBar={onCloseSnackBar!}
                />
                {visibleScheduleModal && (
                    <ScheduleModal
                        visible={visibleScheduleModal}
                        selectedScheduleDate={selectedScheduleDate}
                        onClose={onCloseScheduleModal}
                        handleScheduleDate={handleScheduleDate}
                        clearScheduleDate={clearScheduleDate}
                        onOpenUnsentTweetsModal={onOpenUnsentTweetsModal}
                    />
                )}
                {visibleUnsentTweetsModal && (
                    <UnsentTweetsModal
                        visible={visibleUnsentTweetsModal}
                        onClose={onCloseUnsentTweetsModal}
                    />
                )}
            </div>
        </div>
    );
};

export default withSnackbar(AddTweetForm);
