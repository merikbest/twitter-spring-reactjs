import { makeStyles } from "@material-ui/core";

export const useAnalyticsIconButtonStyles = makeStyles((theme) => ({
    replyIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: theme.palette.text.secondary
            }
        },
        "& span": {
            verticalAlign: "middle",
            color: theme.palette.text.secondary
        }
    }
}));
