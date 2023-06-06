import React, { FC, memo, ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MODAL } from "../../../constants/path-constants";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { CloseIcon } from "../../../icons";
import { useAddTweetImageStyles } from "./AddTweetImageStyles";
import TagPeople from "./TagPeople/TagPeople";
import AddDescription from "./AddDescription/AddDescription";
import { UserResponse } from "../../../types/user";
import { removeImages } from "../../../store/ducks/addTweetForm/actionCreators";
import { selectImages } from "../../../store/ducks/addTweetForm/selector";

interface AddTweetImageProps {
    removeImage: () => void;
    selectedUsers: UserResponse[];
    handleDelete: (selectedUser: UserResponse) => void;
    handleListItemClick: (user: UserResponse) => void;
}

const AddTweetImage: FC<AddTweetImageProps> = memo((
    {
        removeImage,
        selectedUsers,
        handleDelete,
        handleListItemClick
    }
): ReactElement | null => {
    const classes = useAddTweetImageStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const images = useSelector(selectImages);

    const onClickRemoveImage = (): void => {
        dispatch(removeImages());
    };

    if (images.length === 0) {
        return null;
    }

    return (
        <div className={(location.pathname.includes(MODAL)) ? classes.imageSmall : classes.image}>
            <img src={images[0].src} alt={images[0].src} />
            <div>
                <TagPeople
                    selectedUsers={selectedUsers}
                    handleDelete={handleDelete}
                    handleListItemClick={handleListItemClick}
                />
                <AddDescription imageSrc={images[0].src} />
            </div>
            <div className={classes.imageRemove}>
                <ActionIconButton
                    actionText={"Remove"}
                    icon={CloseIcon}
                    onClick={removeImage}
                    size={"medium"}
                />
            </div>
        </div>
    );
});

export default AddTweetImage;
