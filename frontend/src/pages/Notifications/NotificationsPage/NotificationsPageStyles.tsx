import { makeStyles } from "@material-ui/core";

export const useNotificationsPageStyles = makeStyles((theme) => ({
    notificationWrapper: {
        display: "flex",
        cursor: "pointer",
        alignItems: "flex-start",
        padding: "11px 15px",
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        }

    },
    notificationIcon: {
        alignItems: "flex-end",
        marginLeft: 15,
        marginRight: 11,
        "& #notification": {
            color: "rgb(29, 155, 240)"
        },
        "& #retweet": {
            color: "rgb(23, 191, 99)"
        },
        "& #like": {
            color: "rgb(224, 36, 94)"
        },
        "& #follow": {
            color: "rgb(29, 155, 240)"
        },
        "& svg": {
            verticalAlign: "bottom",
            height: "2.30em"
        }
    },
    notificationInfoText: {
        "& .MuiTypography-h5": {
            fontWeight: 700
        }
    }
}));
