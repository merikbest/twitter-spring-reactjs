import { makeStyles } from "@material-ui/core";

export const useProfilePictureModalStyles = makeStyles(() => ({
    avatarWrapper: {
        position: "relative",
        margin: "62px auto",
        width: 184,
        fontSize: 16,
        "& .MuiButtonBase-root": {
            "& MuiIconButton-root": {
                top: 66,
                left: 67
            }
        },
        "& img": {
            width: "184px",
            height: "184px"
        },
        "& .MuiAvatar-root": {
            zIndex: 4,
            width: "184px !important",
            height: "184px !important"
        }
    }
}));
