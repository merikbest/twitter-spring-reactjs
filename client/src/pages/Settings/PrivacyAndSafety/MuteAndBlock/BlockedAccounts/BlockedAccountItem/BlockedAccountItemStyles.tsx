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
            backgroundColor: theme.palette.secondary.main,
        },
    },
    link: {
        color: theme.palette.text.primary,
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
        color: theme.palette.text.primary,
        fontWeight: 800,
        fontSize: 15,
    },
    username: {
        lineHeight: "20px",
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 15,
    },
    blockButton: {
        marginRight: 16,
        "& .MuiButtonBase-root": {
            padding: "8px 16px",
            color: props => props.isUserBlocked ? theme.palette.common.white : theme.palette.error.main,
            backgroundColor: props => props.isUserBlocked ? theme.palette.error.main : theme.palette.common.white,
            border: "1px solid",
            borderColor: props => props.isUserBlocked ? theme.palette.error.main : theme.palette.error.light,
            "& .MuiButton-label": {
                fontSize: 15,
                fontWeight: 700,
                lineHeight: "20px",
            },
            "&:hover": {
                backgroundColor: props => props.isUserBlocked ? "rgb(220, 30, 41)" : theme.palette.error.light,
            },
        },
    },
}));
