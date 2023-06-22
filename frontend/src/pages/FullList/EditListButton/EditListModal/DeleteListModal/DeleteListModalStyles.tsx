import { makeStyles } from "@material-ui/core";

export const useDeleteListModalStyles = makeStyles((theme) => ({
    deleteList: {
        padding: "12px 16px",
        color: theme.palette.error.main,
        border: 0,
        borderRadius: "0px 0px 16px 16px",
        textAlign: "center",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(244, 33, 46, 0.1)"
        }
    },
    modalWrapper: {
        width: 280,
        height: "100%",
        textAlign: "center",
        margin: "32px 20px",
        "& svg": {
            color: theme.palette.primary.main,
            fontSize: 45
        },
        "& .MuiTypography-subtitle1": {
            marginTop: 8,
            marginBottom: 24
        }
    },
    modalButtonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "& .MuiButton-root": {
            width: 134
        }
    },
    modalCancelButton: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.divider
    },
    modalDeleteButton: {
        "&.MuiButton-contained": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.error.main
        },
        "&.MuiButton-contained:hover": {
            backgroundColor: "rgb(220, 30, 41)"
        }
    }
}));
