import {makeStyles, Theme} from "@material-ui/core";

export const useTweetComponentActionsModalStyles = makeStyles((theme: Theme) => ({
    modalWrapper: {
        width: 280,
        height: (props: { modalTitle: string }) => props.modalTitle === 'Delete' ? 190 : 150,
        textAlign: "center",
        margin: "32px 20px",
        "& svg": {
            color: theme.palette.primary.main,
            fontSize: 45,
        },
    },
    modalFullName: {
        color: theme.palette.text.primary,
        fontWeight: 700,
        fontSize: 20,
    },
    modalUsername: {
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 15,
        marginTop: 8,
        marginBottom: 24,
    },
    modalButtonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalCancelButton: {
        width: 134,
        height: 40,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.divider,
        borderRadius: '25px',
    },
    modalButton: {
        width: 134,
        height: 40,
        borderRadius: '25px',
    },
    modalDeleteButton: {
        "&.MuiButton-contained": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.error.main,
        },
        "&.MuiButton-contained:hover": {
            backgroundColor: theme.palette.error.dark,
        },
    },
    modalPrimaryButton: {
        "&.MuiButton-contained": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
        },
        "&.MuiButton-contained:hover": {
            backgroundColor: "rgb(26, 145, 218)",
        },
    },
}));
