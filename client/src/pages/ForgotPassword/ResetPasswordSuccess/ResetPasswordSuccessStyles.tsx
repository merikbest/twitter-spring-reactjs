import {makeStyles, Theme} from "@material-ui/core";

export const useResetPasswordSuccessStyles = makeStyles((theme: Theme) => ({
    title: {
        fontSize: 23,
        fontWeight: 700,
        color: theme.palette.common.black,
        lineHeight: "36px",
    },
    infoWrapper: {
        margin: "7px 0px",
    },
    successHeader: {
        "& a": {
            color: theme.palette.primary.main,
            "&:hover": {
                cursor: 'pointer',
            },
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
