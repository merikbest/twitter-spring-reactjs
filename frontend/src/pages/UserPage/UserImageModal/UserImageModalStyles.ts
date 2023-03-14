import { makeStyles, Theme } from "@material-ui/core";

interface UserImageModalStylesProps {
    pathname: string;
}

export const useUserImageModalStyles = makeStyles<Theme, UserImageModalStylesProps>((theme) => ({
    container: {
        zIndex: 12,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.85)",
        cursor: "auto"
    },
    imageModal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: props => props.pathname.includes("header_photo") ? "100%" : 368,
        width: props => props.pathname.includes("header_photo") ? "auto" : 368,
        borderRadius: props => props.pathname.includes("header_photo") ? "none" : "50%"
    },
    imageModalClose: {
        margin: 10,
        "& svg": {
            height: "0.9em",
            color: theme.palette.common.white
        }
    }
}));