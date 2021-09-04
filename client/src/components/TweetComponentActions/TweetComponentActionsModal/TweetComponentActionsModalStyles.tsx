import {makeStyles, Theme} from "@material-ui/core";

export const useTweetComponentActionsModalStyles = makeStyles((theme: Theme) => ({
    modalWrapper: {
        width: 280,
        height: (props: { modalTitle: string }) => props.modalTitle === 'Delete' ? 190 : 150,
        textAlign: "center",
        margin: "32px 20px",
        "& svg": {
            color: "rgb(29, 161, 242)",
            fontSize: 45,
        },
    },
    modalFullName: {
        color: "rgb(15, 20, 25)",
        fontWeight: 700,
        fontSize: 20,
    },
    modalUsername: {
        color: "rgb(83, 100, 113)",
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
        color: "#000",
        backgroundColor: "rgb(239, 243, 244)",
        borderRadius: '25px',
    },
    modalButton: {
        width: 134,
        height: 40,
        borderRadius: '25px',
    },
    modalDeleteButton: {
        "&.MuiButton-contained": {
            color: "#fff",
            backgroundColor: "rgb(244, 33, 46)",
        },
        "&.MuiButton-contained:hover": {
            backgroundColor: "rgb(220, 30, 41)",
        },
    },
    modalPrimaryButton: {
        "&.MuiButton-contained": {
            color: "#fff",
            backgroundColor: "rgb(29, 161, 242)",
        },
        "&.MuiButton-contained:hover": {
            backgroundColor: "rgb(26, 145, 218)",
        },
    },
}));
