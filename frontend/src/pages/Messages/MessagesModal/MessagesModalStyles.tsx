import { makeStyles } from "@material-ui/core";

export const useMessagesModalStyles = makeStyles((theme) => ({
    content: {
        "& .MuiListItem-root.Mui-selected": {
            backgroundColor: theme.palette.secondary.main
        }
    }
}));
