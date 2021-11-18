import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Button, Checkbox, Dialog, DialogContent, DialogTitle, Typography} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {useEditListModalStyles} from "./EditListModalStyles";
import UploadProfileImage from "../../../components/EditProfileModal/UploadProfileImage";
import CreateListsModalInput from "../../Lists/CreateListsModal/CreateListsModalInput/CreateListsModalInput";
import {ImageObj} from "../../../components/AddTweetForm/AddTweetForm";
import {ForwardArrowIcon} from "../../../icons";
import ManageMembersModal from "./ManageMembersModal/ManageMembersModal";
import DeleteListModal from "./DeleteListModal/DeleteListModal";
import {deleteList, editList} from "../../../store/ducks/list/actionCreators";
import {Image} from "../../../store/ducks/tweets/contracts/state";
import {uploadImage} from "../../../util/uploadImage";
import CloseButton from "../../../components/CloseButton/CloseButton";
import {selectListItem} from "../../../store/ducks/list/selectors";

interface EditListModalProps {
    visible?: boolean;
    onClose: () => void;
}

export interface EditListModalFormProps {
    id: number;
    name?: string;
    description?: string;
    isPrivate: boolean;
    wallpaper?: Image;
}

export const EditListModalFormSchema = yup.object().shape({
    name: yup.string().min(1, "Name can’t be blank").required(),
});

const EditListModal: FC<EditListModalProps> = ({visible, onClose}): ReactElement | null => {
    const classes = useEditListModalStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const list = useSelector(selectListItem);

    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const [isListPrivate, setIsListPrivate] = useState<boolean>(false);
    const [visibleManageMembersModal, setVisibleManageMembersModal] = useState<boolean>(false);
    const [visibleDeleteListModal, setVisibleDeleteListModal] = useState<boolean>(false);

    const {control, register, handleSubmit, formState: {errors}} = useForm<EditListModalFormProps>({
        defaultValues: {
            id: list?.id,
            name: list?.name,
            description: list?.description,
            isPrivate: list?.isPrivate,
            wallpaper: list?.wallpaper,
        },
        resolver: yupResolver(EditListModalFormSchema),
        mode: "onChange",
    });

    useEffect(() => {
        setIsListPrivate(list?.isPrivate!);
    }, [visible]);

    const onSubmit = async (data: EditListModalFormProps): Promise<void> => {
        let wallpaperResponse: Image | undefined = undefined;

        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }
        dispatch(editList({...data, wallpaper: wallpaperResponse}));
        onClose();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setIsListPrivate(event.target.checked);
    };

    const onOpenManageMembersModal = (): void => {
        setVisibleManageMembersModal(true);
    };

    const onCloseManageMembersModal = (): void => {
        setVisibleManageMembersModal(false);
    };

    const onOpenDeleteListModal = (): void => {
        setVisibleDeleteListModal(true);
    };

    const onCloseDeleteListModal = (): void => {
        setVisibleDeleteListModal(false);
    };

    const onDeleteList = (): void => {
        setVisibleDeleteListModal(false);
        dispatch(deleteList(list?.id!));
        history.push("/lists");
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} className={classes.dialog} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="form-dialog-title">
                    <CloseButton onClose={onClose}/>
                    Edit List
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Done
                    </Button>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <div>
                        <div className={classes.wallpaperWrapper}>
                            <img
                                className={classes.wallpaperImg}
                                key={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                                src={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                                alt={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                            />
                            <div className={classes.wallpaperEditImg}>
                                <UploadProfileImage name={"wallpaper"} image={wallpaper} onChangeImage={setWallpaper}/>
                            </div>
                        </div>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({field: {onChange, value}}) => (
                                <CreateListsModalInput
                                    label={"Name"}
                                    helperText={errors.name?.message}
                                    error={!!errors.name}
                                    onChange={onChange}
                                    value={value}
                                    maxTextLength={25}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({field: {onChange, value}}) => (
                                <CreateListsModalInput
                                    label={"Description"}
                                    onChange={onChange}
                                    value={value}
                                    maxTextLength={50}
                                />
                            )}
                        />
                        <div className={classes.footer}>
                            <div className={classes.footerWrapper}>
                                <Typography component={"div"} className={classes.footerTitle}>
                                    Make private
                                </Typography>
                                <Checkbox
                                    checked={isListPrivate}
                                    onChange={handleChange}
                                    name="private"
                                    color="primary"
                                />
                            </div>
                            <Typography component={"div"} className={classes.footerText}>
                                When you make a List private, only you can see it.
                            </Typography>
                        </div>
                        <Typography component={"div"} className={classes.manageMembers} onClick={onOpenManageMembersModal}>
                            Manage members
                            <>{ForwardArrowIcon}</>
                        </Typography>
                        <Typography component={"div"} className={classes.deleteList} onClick={onOpenDeleteListModal}>
                            Delete List
                        </Typography>
                    </div>
                </DialogContent>
            </form>
            <ManageMembersModal
                visible={visibleManageMembersModal}
                onClose={onCloseManageMembersModal}
            />
            <DeleteListModal
                visible={visibleDeleteListModal}
                onClose={onCloseDeleteListModal}
                onDeleteList={onDeleteList}
            />
        </Dialog>
    );
};

export default EditListModal;
