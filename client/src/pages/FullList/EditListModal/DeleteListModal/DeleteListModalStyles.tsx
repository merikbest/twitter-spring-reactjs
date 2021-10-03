import {makeStyles, Theme} from "@material-ui/core";

export const useDeleteListModalStyles = makeStyles((theme: Theme) => ({
    modalWrapper: {
        width: 280,
        height: 150,
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
    modalDeleteButton: {
        width: 134,
        height: 40,
        borderRadius: '25px',
        "&.MuiButton-contained": {
            color: "#fff",
            backgroundColor: "rgb(244, 33, 46)",
        },
        "&.MuiButton-contained:hover": {
            backgroundColor: "rgb(220, 30, 41)",
        },
    },
}));
