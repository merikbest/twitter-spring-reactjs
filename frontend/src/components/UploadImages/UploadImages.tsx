import React, { FC, memo, ReactElement, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { MediaIcon } from "../../icons";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import { setImages } from "../../store/ducks/addTweetForm/actionCreators";

const UploadImages: FC = memo((): ReactElement => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleChangeFileInput = useCallback((event: Event): void => {
        if (event.target) {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                const fileObj = new Blob([file]);
                dispatch(setImages([{ src: URL.createObjectURL(fileObj), file }]));
            }
        }
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener("change", handleChangeFileInput);
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener("change", handleChangeFileInput);
            }
        };
    }, []);

    return (
        <>
            <ActionIconButton
                actionText={"Media"}
                icon={MediaIcon}
                onClick={handleClickImage}
                size={"medium"}
            />
            <input ref={inputRef} type="file" id="upload-input" hidden />
        </>
    );
});

export default UploadImages;
