import {makeStyles, Theme} from "@material-ui/core";

interface MutedAccountItemStylesProps {
    isUserMuted: boolean;
}

export const useMutedAccountItemStyles = makeStyles<Theme, MutedAccountItemStylesProps>((theme) => ({
    container: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        display: "flex",
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8,
        cursor: 'pointer',
        "& .MuiPaper-outlined": {
            minHeight: "1vh",
        },
        '&:hover': {
            backgroundColor: 'rgb(245, 248, 250)',
        },
    },
    link: {
        color: "#000",
        textDecoration: 'none',
    },
    listAvatar: {
        width: "46px !important",
        height: "46px !important",
        marginRight: 15,
    },
    userInfo: {
        position: "relative",
        maxWidth: 350
    },
    userInfoWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    fullName: {
        lineHeight: "20px",
        color: "rgb(15, 20, 25)",
        fontWeight: 800,
        fontSize: 15,
    },
    username: {
        lineHeight: "20px",
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 15,
    },
    muteButton: {
        marginRight: 16,
        "& .MuiIconButton-root": {
            padding: 7,
            borderColor: props => props.isUserMuted ? "rgb(255, 221, 237)" : "rgb(207, 217, 222)",
            border: "1px solid",
            borderRadius: "50%",
            "& svg": {
                color: props => props.isUserMuted ? "rgb(244, 33, 46)" : "rgb(29, 155, 240)",
                height: "0.85em",
            },
            "&:hover": {
                backgroundColor: props => props.isUserMuted ? "rgba(244, 33, 46, 0.1)" : "rgba(29, 155, 240, 0.1)",
            },
        },
    },
    snackBar: {
        "& .MuiSnackbarContent-root": {
            width: 179,
            height: 44,
            padding: 0,
            backgroundColor: "rgb(29, 161, 242)",
            "& .MuiSnackbarContent-message": {
                fontSize: 15,
                margin: "0 auto",
                textAlign: "center",
            },
        },
    },
}));
