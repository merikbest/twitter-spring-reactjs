import {makeStyles, Theme} from "@material-ui/core";

export const useResetPasswordSuccessStyles = makeStyles((theme: Theme) => ({
    title: {
        lineHeight: "36px",
    },
    infoWrapper: {
        marginBottom: 14,
    },
    successHeader: {
        color: "rgb(29, 161, 242)",
        fontSize: 18,
        "&:hover": {
            cursor: 'pointer',
        },
    },
    link: {
        display: "block",
        paddingTop: 36,
        fontSize: 13,
        color: "rgb(29, 161, 242)",
        "&:hover": {
            cursor: 'pointer',
        },
    },
}));
