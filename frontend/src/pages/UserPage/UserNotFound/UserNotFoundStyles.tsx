import { makeStyles } from "@material-ui/core";

export const useUserNotFoundStyles = makeStyles((theme) => ({
    container: {
        "& .MuiTab-root": {
            textTransform: "none !important",
            minWidth: "150px !important",
            padding: "14px 12px !important"
        },
        "& .MuiTab-wrapper": {
            fontWeight: "700px !important",
            fontSize: 16
        }
    },
    wallpaper: {
        height: 253,
        backgroundColor: theme.palette.grey[700],
        position: "relative",
        "& img": {
            objectFit: "cover",
            position: "absolute",
            width: 601,
            height: 200
        }
    },
    avatar: {
        marginTop: -70,
        padding: 20,
        paddingTop: 0,
        fontSize: 15,
        "& .MuiAvatar-root": {
            backgroundColor: theme.palette.grey[600],
            width: "140px !important",
            height: "140px !important",
            border: `4px solid ${theme.palette.background.paper}`
        }
    },
    info: {
        margin: "40px 20px",
        textAlign: "center"
    }
}));
