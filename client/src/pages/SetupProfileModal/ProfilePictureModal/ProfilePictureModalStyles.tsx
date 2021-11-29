import {makeStyles} from "@material-ui/core";

export const useProfilePictureModalStyles = makeStyles((theme) => ({
    container: {
        width: 598,
        height: 600,
        marginTop: 5,
        position: "relative",
    },
    logoIcon: {
        margin: "0 auto",
        width: 30,
        "& svg": {
            fontSize: 34,
            color: theme.palette.primary.main,
        },
    },
    title: {
        margin: "16px 0",
        fontWeight: 700,
        fontSize: 23,
    },
    text: {
        color: theme.palette.text.secondary,
        fontSize: 15,
    },
    avatarWrapper: {
        position: "relative",
        margin: "62px auto",
        width: 184,
        fontSize: 16,
        "& .MuiButtonBase-root": {
            "& MuiIconButton-root": {
                top: 66,
                left: 67,
            },
        },
        "& img": {
            width: "184px",
            height: "184px",
        },
        "& .MuiAvatar-root": {
            zIndex: 4,
            width: "184px !important",
            height: "184px !important",
        },
    },
    button: {
        position: "absolute",
        bottom: 0,
        width: 530,
        marginBottom: 30,
        fontSize: 15,
    },
}));
