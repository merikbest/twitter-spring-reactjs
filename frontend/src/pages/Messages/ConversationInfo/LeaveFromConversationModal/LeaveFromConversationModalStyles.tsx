import { makeStyles } from "@material-ui/core";

export const useLeaveFromConversationModalStyles = makeStyles((theme) => ({
    modalWrapper: {
        width: 280,
        minHeight: 176,
        textAlign: "center",
        margin: "32px 20px",
        "& .MuiTypography-subtitle1": {
            margin: "8px 0px 24px"
        }
    },
    blockButton: {
        "&.MuiButtonBase-root": {
            marginBottom: 12,
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: "rgb(220, 30, 41)"
            }
        }
    }
}));
