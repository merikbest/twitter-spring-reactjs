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

interface AddTweetFormProps {
    classes: ReturnType<typeof useHomeStyles>;
    maxRows?: number;
}

export interface ImageObj {
    src: string;
    file: File;
}

const MAX_LENGTH = 280;

export const AddTweetForm: FC<AddTweetFormProps> = ({classes, maxRows}: AddTweetFormProps): ReactElement => {
    const dispatch = useDispatch();
    const addFormState = useSelector(selectAddFormState);
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
        dispatch(fetchAddTweet({ text, images: result }));
        setText('');
        setImages([]);
    };

    return (
        <div>
            <div className={classes.addFormBody}>
                <Avatar
                    className={classes.tweetAvatar}
                    alt={`Аватарка пользователя UserAvatar`}
                    src="https://i0.wp.com/liveforlivemusic.com/wp-content/uploads/2017/04/Screen-Shot-2018-04-04-at-5.39.27-PM.png?resize=740%2C390&ssl=1"
                />
                <TextareaAutosize
                    onChange={handleChangeTextarea}
                    className={classes.addFormTextarea}
                    placeholder="Что происходит?"
                    value={text}
                    rowsMax={maxRows}
                />
            </div>
            <div className={classes.addFormBottom}>
                <div className={classNames(classes.tweetFooter, classes.addFormBottomActions)}>
                    <UploadImages images={images} onChangeImages={setImages} />
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
                        onClick={handleClickAddTweet}
                        disabled={addFormState === AddFormState.LOADING || !text || text.length >= MAX_LENGTH}
                        color="primary"
                        variant="contained">
                        {addFormState === AddFormState.LOADING ? (
                            <CircularProgress color="inherit" size={16} />
                        ) : (
                            'Твитнуть'
                        )}
                    </Button>
                </div>
            </div>
            {addFormState === AddFormState.ERROR && (
                <Alert severity="error">
                    Ошибка при добавлении твита{' '}
                    <span aria-label="emoji-plak" role="img">😞</span>
                </Alert>
            )}
        </div>
    );
};
