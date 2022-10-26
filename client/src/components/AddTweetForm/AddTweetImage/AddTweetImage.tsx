import React, {FC, memo, ReactElement} from "react";
import {useLocation} from "react-router-dom";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import {MODAL} from "../../../util/pathConstants";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import {CloseIcon} from "../../../icons";
import {ImageObj} from "../AddTweetForm";

interface AddTweetImageProps {
    classes: ClassNameMap<string>;
    images: ImageObj[]
    removeImage: () => void;
}

const AddTweetImage: FC<AddTweetImageProps> = memo(({classes, images, removeImage}): ReactElement | null => {
    const location = useLocation();

    if (images.length === 0) {
        return null;
    }

    return (
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
    );
});

export default AddTweetImage;
