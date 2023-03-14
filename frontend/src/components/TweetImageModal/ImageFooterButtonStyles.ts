import { makeStyles } from "@material-ui/core";

export const useImageFooterButtonStyles = makeStyles((theme) => ({
    imageFooterIcon: {
        "& .MuiTypography-body1": {
            verticalAlign: "text-top"
        },
        "& .MuiIconButton-root": {
            "& svg": {
                color: theme.palette.common.white
            },
            "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                "& svg": {
                    color: "rgb(255, 255, 255) !important"
                }
            }
        },
        "& span": {
            color: theme.palette.common.white
        }
    }
}));
