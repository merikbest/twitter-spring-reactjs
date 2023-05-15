import { makeStyles, Theme } from "@material-ui/core";

export const useMessagesModalStyles = makeStyles((theme: Theme) => ({
    content: {
        "& .MuiListItem-root.Mui-selected": {
            backgroundColor: theme.palette.secondary.main
        }
    }
}));
