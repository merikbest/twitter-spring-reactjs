import { createStyles, makeStyles } from "@material-ui/core";

export const useChangeReplyWindowStyles = makeStyles((theme) => createStyles({
    dropdown: {
        width: 320,
        zIndex: 2,
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& #lastItem": {
            borderRadius: "0px 0px 16px 16px"
        }
    },
    infoWrapper: {
        padding: "16px 16px 12px 16px",
        "& .MuiTypography-root": {
            textAlign: "center"
        }
    }
}));
