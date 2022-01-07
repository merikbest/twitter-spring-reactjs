import {makeStyles, Theme} from "@material-ui/core";

export const useUserNotFoundStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        paddingBottom: 500,
        borderTop: 0,
        borderBottom: 0,
        "& .MuiTab-root": {
            textTransform: "none !important",
            minWidth: "150px !important",
            padding: "14px 12px !important",
        },
        "& .MuiTab-wrapper": {
            fontWeight: "700px !important",
            fontSize: 16,
        },
    },
    header: {
        position: "fixed",
        width: 602,
        height: 53,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
    },
    headerTitle: {
        fontWeight: 800,
        fontSize: 20,
        lineHeight: "24px",
    },
    wallpaper: {
        height: 253,
        backgroundColor: theme.palette.grey[700],
        position: "relative",
        "& img": {
            objectFit: "cover",
            position: "absolute",
            width: 601,
            height: 200,
        },
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
            border: `4px solid ${theme.palette.background.paper}`,
        },
    },
    info: {
        margin: "40px 20px",
        textAlign: "center"
    },
    infoTitle: {
        marginBottom: 8,
        fontWeight: 800,
        lineHeight: "36px",
        fontSize: 31,
        color: theme.palette.text.primary,
    },
    infoText: {
        fontWeight: 400,
        lineHeight: "20px",
        fontSize: 15,
        color: theme.palette.text.secondary,
    },
}));
