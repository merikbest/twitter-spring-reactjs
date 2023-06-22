import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

export const MessageInput = withStyles((theme) => ({
    root: {
        "& .MuiOutlinedInput-root": {
            marginTop: 2,
            borderRadius: 20,
            padding: "9px 14px",
            border: `1px solid ${theme.palette.divider}`,
            width: 475,
            "&.Mui-focused": {
                backgroundColor: theme.palette.background.paper,
                "& fieldset": { borderWidth: 1, borderColor: theme.palette.primary.main },
                "& svg path": {
                    fill: theme.palette.primary.main
                }
            },
            "&:hover": {
                "& fieldset": { borderColor: "transparent" }
            },
            "& fieldset": {
                borderColor: "transparent",
                borderWidth: 1
            }
        },
        "& .MuiOutlinedInput-input": {
            "&::placeholder": {
                color: theme.palette.text.primary
            }
        }
    }
}))(TextField);
