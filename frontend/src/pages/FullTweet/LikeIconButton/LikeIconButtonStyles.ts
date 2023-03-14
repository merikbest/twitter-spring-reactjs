import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface LikeIconButtonStyles {
    isTweetLiked: boolean;
}

export const useLikeIconButtonStyles = makeStyles<Theme, LikeIconButtonStyles>((theme) => createStyles({
    likeIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isTweetLiked ? "rgb(224, 36, 94)" : theme.palette.text.secondary,
                width: "1.406rem",
                height: "1.406rem"
            },
            "&:hover": {
                backgroundColor: "rgba(249, 24, 128, 0.1) !important",
                "& svg": {
                    color: "rgb(224, 36, 94) !important"
                }
            }
        }
    }
}));
