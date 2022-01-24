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
    listAvatar: {
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
    blockButton: {
        marginRight: 16,
        "& .MuiButtonBase-root": {
            color: props => props.isUserBlocked ? theme.palette.common.white : theme.palette.error.main,
            backgroundColor: props => props.isUserBlocked ? theme.palette.error.main : theme.palette.common.white,
            border: "1px solid",
            borderColor: props => props.isUserBlocked ? theme.palette.error.main : theme.palette.error.light,
            "&:hover": {
                backgroundColor: props => props.isUserBlocked ? "rgb(220, 30, 41)" : theme.palette.error.light,
            },
        },
    },
}));
