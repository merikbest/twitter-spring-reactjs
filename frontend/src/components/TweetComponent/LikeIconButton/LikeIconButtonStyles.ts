import { makeStyles, Theme } from "@material-ui/core";

interface TweetLikeIconButtonProps {
    isTweetLiked?: boolean;
}

export const useLikeIconButtonStyles = makeStyles<Theme, TweetLikeIconButtonProps>((theme) => ({
    likeIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isTweetLiked ? "rgb(224, 36, 94)" : theme.palette.text.secondary
            },
            "&:hover": {
                backgroundColor: "rgba(249, 24, 128, 0.1) !important",
                "& svg": {
                    color: "rgb(224, 36, 94) !important"
                }
            }
        },
        "& span": {
            verticalAlign: "middle",
            color: props => props.isTweetLiked ? "rgb(224, 36, 94)" : theme.palette.text.secondary
        }
    },
    likedTweetsCount: {
        position: "absolute",
        marginTop: 7
    }
}));
