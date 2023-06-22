import { makeStyles } from "@material-ui/core";

export const useFollowerRequestsItemStyles = makeStyles((theme) => ({
    container: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        display: "flex",
        alignItems: "flex-start",
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    listAvatar: {
        width: "48px !important",
        height: "48px !important",
        marginRight: 15
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerUserInfo: {
        position: "relative",
        width: 350
    },
    buttonWrapper: {
        display: "flex",
        marginTop: 8
    },
    buttonItemWrapper: {
        display: "inline-block",
        width: "50%",
        marginRight: 12
    },
    declineButton: {
        "& .MuiButton-root": {
            borderColor: theme.palette.error.light,
            color: theme.palette.error.main,
            "&:hover": {
                borderColor: theme.palette.error.light,
                backgroundColor: "rgb(244, 33, 46, 0.1)"
            }
        }
    },
    acceptButton: {
        "& .MuiButton-root": {
            borderColor: theme.palette.info.light,
            color: theme.palette.primary.main,
            "&:hover": {
                borderColor: theme.palette.info.light,
                backgroundColor: theme.palette.action.hover
            }
        }
    }
}));
