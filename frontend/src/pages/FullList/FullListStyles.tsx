import { makeStyles } from "@material-ui/core";

export const useFullListStyles = makeStyles(() => ({
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.5em"
        }
    },
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10
    },
    wallpaper: {
        height: 200,
        "& img": {
            objectFit: "cover",
            position: "absolute",
            width: 601,
            height: 200
        }
    },
    listInfo: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        padding: 12,
        textAlign: "center",
        "& .MuiTypography-h5": {
            marginBottom: 12
        },
        "& .MuiTypography-body1": {
            marginBottom: 12
        }
    },
    listOwnerLink: {
        color: "black",
        textDecoration: "none",
        "& .MuiTypography-h6": {
            verticalAlign: "top",
            marginRight: 4,
            "&:hover": {
                textDecoration: "underline"
            }
        },
        "& .MuiTypography-subtitle1": {
            verticalAlign: "top"
        }
    },
    listOwnerWrapper: {
        display: "inline-block"
    },
    listOwnerAvatar: {
        marginRight: 4,
        width: "20px !important",
        height: "20px !important"
    },
    buttonWrapper: {
        marginTop: 20,
        marginBottom: 12
    }
}));
