import {makeStyles, Theme} from "@material-ui/core";

export const useManageMembersItemStyles = makeStyles((theme: Theme) => ({
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
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    listAvatar: {
        width: theme.spacing(6.7),
        height: theme.spacing(6.7),
        marginRight: 15,
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em",
        },
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
        "& .MuiButton-root": {
            float: 'right',
            marginRight: 15,
        },
    },
    outlinedButton: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    containedButton: {
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
}));
