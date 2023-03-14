import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface RetweetIconButtonStyles {
    isTweetRetweeted: boolean;
}

export const useRetweetIconButtonStyles = makeStyles<Theme, RetweetIconButtonStyles>((theme) => createStyles({
    retweetIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isTweetRetweeted ? "rgb(23, 191, 99)" : theme.palette.text.secondary,
                width: "1.406rem",
                height: "1.406rem"
            },
            "&:hover": {
                backgroundColor: "rgba(0, 186, 124, 0.1) !important",
                "& svg": {
                    color: "rgb(23, 191, 99) !important"
                }
            }
        }
    }
}));
