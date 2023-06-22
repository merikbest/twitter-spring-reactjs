import { makeStyles } from "@material-ui/core";

export const useTweetComponentActionsModalStyles = makeStyles((theme) => ({
    modalWrapper: {
        width: 280,
        height: (props: { modalTitle: string }) => props.modalTitle === "Delete" ? 190 : 150,
        textAlign: "center",
        margin: "32px 20px",
        "& svg": {
            color: theme.palette.primary.main,
            fontSize: 45
        },
        "& .MuiTypography-subtitle1": {
            marginTop: 8,
            marginBottom: 24
        },
        "& .MuiButton-root": {
            width: 134,
            "& .MuiButton-label": {
                fontSize: 15,
                lineHeight: "20px"
            }
        }
    },
    modalButtonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
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
            backgroundColor: theme.palette.error.dark
        }
    },
    modalPrimaryButton: {
        "&.MuiButton-contained": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main
        },
        "&.MuiButton-contained:hover": {
            backgroundColor: "rgb(26, 145, 218)"
        }
    }
}));
