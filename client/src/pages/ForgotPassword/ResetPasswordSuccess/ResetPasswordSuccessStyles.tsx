import {makeStyles, Theme} from "@material-ui/core";

export const useResetPasswordSuccessStyles = makeStyles((theme: Theme) => ({
    title: {
        lineHeight: "36px",
    },
    infoWrapper: {
        marginBottom: 14,
    },
    successHeader: {
        color: theme.palette.primary.main,
        fontSize: 18,
        "&:hover": {
            cursor: 'pointer',
        },
    },
    link: {
        display: "block",
        paddingTop: 36,
        fontSize: 13,
        color: theme.palette.primary.main,
        "&:hover": {
            cursor: 'pointer',
        },
    },
}));
