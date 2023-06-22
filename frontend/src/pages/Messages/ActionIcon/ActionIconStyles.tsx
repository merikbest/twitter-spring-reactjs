import { makeStyles } from "@material-ui/core";

export const useActionIconStyles = makeStyles((theme) => ({
    icon: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                color: theme.palette.primary.main,
                verticalAlign: "bottom",
                height: "0.90em"
            }
        }
    },
    chatIcon: {
        "& .MuiIconButton-root": {
            width: 30,
            height: 30,
            paddingTop: 2,
            "& svg": {
                height: "0.82em"
            }
        }
    },
    emojiIcon: {
        right: 50,
        paddingTop: 5,
        "& .MuiIconButton-root": {
            width: 30,
            height: 30,
            "& svg": {
                height: "0.82em"
            }
        }
    }
}));
