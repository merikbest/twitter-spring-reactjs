import {makeStyles, Theme} from "@material-ui/core";

interface BlockedAccountItemStylesProps {
    isUserBlocked: boolean;
}

export const useBlockedAccountItemStyles = makeStyles<Theme, BlockedAccountItemStylesProps>((theme) => ({
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
    blockButton: {
        marginRight: 16,
        "& .MuiButtonBase-root": {
            padding: "8px 16px",
            color: props => props.isUserBlocked ? "rgb(255, 255, 255)" : "rgb(244, 33, 46)",
            backgroundColor: props => props.isUserBlocked ? "rgb(244, 33, 46)" : "rgb(255, 255, 255)",
            border: "1px solid",
            borderColor: props => props.isUserBlocked ? "rgb(244, 33, 46)" : "rgb(255, 221, 237)",
            "& .MuiButton-label": {
                fontSize: 15,
                fontWeight: 700,
                lineHeight: "20px",
            },
            "&:hover": {
                backgroundColor: props => props.isUserBlocked ? "rgb(220, 30, 41)" : "rgb(255, 221, 237)",
            },
        },
    },
}));
