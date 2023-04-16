import { makeStyles, Theme } from "@material-ui/core";

interface ReplyIconButtonProps {
    isUserCanReply?: boolean;
}

export const useReplyIconButtonStyles = makeStyles<Theme, ReplyIconButtonProps>((theme) => ({
    replyIcon: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.isUserCanReply ? "rgb(185, 192, 197)" : theme.palette.text.secondary
            }
        },
        "& span": {
            verticalAlign: "middle",
            color: props => props.isUserCanReply ? "rgb(185, 192, 197)" : theme.palette.text.secondary
        }
    },
    repliesCount: {
        position: "absolute",
        marginTop: 7
    }
}));
