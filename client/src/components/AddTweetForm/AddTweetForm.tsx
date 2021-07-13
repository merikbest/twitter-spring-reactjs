import React, {FC, ReactElement} from 'react';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import EmojiIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import {Alert} from "@material-ui/lab";

import {useHomeStyles} from '../../pages/Home/HomeStyles';
import {useDispatch, useSelector} from "react-redux";
import {fetchAddTweet, setAddFormState} from "../../store/ducks/tweets/actionCreators";
import {selectAddFormState} from "../../store/ducks/tweets/selectors";
import {AddFormState, Image} from '../../store/ducks/tweets/contracts/state';
import UploadImages from '../UploadImages/UploadImages';
import {uploadImage} from "../../util/uploadImage";
import {selectUserData} from "../../store/ducks/user/selectors";
import {fetchReplyTweet} from "../../store/ducks/tweet/actionCreators";

interface AddTweetFormProps {
    classes: ReturnType<typeof useHomeStyles>;
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
                                                        classes,
                                                        maxRows,
                                                        tweetId,
                                                        title,
                                                        buttonName,
                                                        addressedUsername
                                                    }: AddTweetFormProps): ReactElement => {
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
        dispatch(fetchAddTweet({ text, images: result, likes: [], retweets: [] }));
        setText('');
        setImages([]);
    };

    const handleClickReplyTweet = (): void => {
        if (addressedUsername) {
            dispatch(fetchReplyTweet({id: tweetId!, text, addressedUsername, images: [], likes: [], retweets: []}));
            setText("");
        }
    };

    return (
        <div>
            <div className={classes.addFormBody}>
                <Avatar
                    className={classes.tweetAvatar}
                    alt={`avatar ${userData?.user.id}`}
                    src={userData?.user.avatar?.src ? userData?.user.avatar?.src :
                        "https://abs.twimg.com/sticky/default_profile_images/default_profile_reasonably_small.png"}
                />
                <TextareaAutosize
                    onChange={handleChangeTextarea}
                    className={classes.addFormTextarea}
                    placeholder={title}
                    value={text}
                    rowsMax={maxRows}
                />
            </div>
            <div className={classes.addFormBottom}>
                <div className={classNames(classes.tweetFooter, classes.addFormBottomActions)}>
                    <UploadImages classes={classes} images={images} onChangeImages={setImages}/>
                    {/*<IconButton color="primary">*/}
                    {/*    <EmojiIcon style={{fontSize: 26}}/>*/}
                    {/*</IconButton>*/}
                </div>
                <div className={classes.addFormBottomRight}>
                    {text && (
                        <>
                            <span>{textCount}</span>
                            <div className={classes.addFormCircleProgress}>
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
