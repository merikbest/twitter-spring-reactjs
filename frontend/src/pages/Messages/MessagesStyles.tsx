import { makeStyles } from "@material-ui/core";

export const useMessagesStyles = makeStyles((theme) => ({
    grid: {
        padding: "12px 0px 0px 0px !important"
    },
    list: {
        "& .Mui-selected": {
            borderRight: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.secondary.dark,
            "&:hover": {
                backgroundColor: theme.palette.secondary.dark
            }
        }
    }
}));
