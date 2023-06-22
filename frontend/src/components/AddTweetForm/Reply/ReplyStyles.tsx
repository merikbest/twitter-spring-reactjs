import { makeStyles } from "@material-ui/core";

export const useReplyStyles = makeStyles((theme) => ({
    reply: {
        position: "relative",
        marginTop: 5,
        "& .MuiButton-root": {
            marginLeft: 50,
            height: 22,
            padding: "0px 11px",
            "& svg": {
                marginTop: 3,
                marginRight: 3,
                width: 16,
                height: 16
            }
        },
        "& .MuiButton-root.Mui-disabled": {
            color: theme.palette.primary.light
        },
        "& .MuiDivider-root": {
            marginLeft: 50,
            marginTop: 8
        }
    },
    popover: {
        "& .MuiPaper-root": {
            boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
            borderRadius: 16
        }
    }
}));
