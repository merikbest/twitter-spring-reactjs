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
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
    },
    listAvatar: {
        width: theme.spacing(6.7),
        height: theme.spacing(6.7),
        marginRight: 15,
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
    about: {
        lineHeight: "20px",
        marginLeft: 5,
        fontWeight: 400,
        fontSize: 15,
    },
    outlinedButton: {
        float: 'right',
        marginRight: 15,
        width: 79,
        height: 32,
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    containedButton: {
        float: 'right',
        marginRight: 15,
        width: 90,
        height: 32,
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
}));
