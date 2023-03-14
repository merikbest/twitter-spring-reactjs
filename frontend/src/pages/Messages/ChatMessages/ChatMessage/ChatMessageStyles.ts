import { makeStyles, Theme } from "@material-ui/core";

interface UseChatMessageStyles {
    isParticipantMessage: boolean;
}

export const useChatMessageStyles = makeStyles<Theme, UseChatMessageStyles>((theme) => ({
    chatMessageContainer: (props) => (
        props.isParticipantMessage ? {
            display: "flex",
            flexDirection: "row"
        } : {}),
    participantAvatar: {
        marginTop: "auto",
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: 10
    },
    tweetContainer: (props) => {
        const common = {
            marginTop: 10,
            display: "flex",
            "& a": {
                color: "inherit",
                textDecoration: "none"
            }
        };
        return (props.isParticipantMessage ? {
            alignItems: "flex-start", ...common
        } : {
            flexDirection: "row-reverse", ...common
        });
    },
    tweetWrapper: (props) => (
        props.isParticipantMessage ? {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "16px 16px 16px 0px",
            padding: 12,
            width: 384,
            "&:hover": {
                cursor: "pointer",
                backgroundColor: "rgb(247, 249, 249)"
            }
        } : {
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: "16px 16px 0px 16px",
            padding: 12,
            width: 384,
            "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main
            }
        }
    ),
    tweetUserInfoWrapper: {
        display: "flex"
    },
    tweetAvatar: {
        width: "18px !important",
        height: "18px !important",
        marginRight: 3
    },
    tweetUsername: {
        marginLeft: 3
    },
    myMessage: (props) => (
        props.isParticipantMessage ? {
            display: "flex",
            alignItems: "flex-start",
            "& .MuiTypography-root": {
                backgroundColor: theme.palette.divider,
                padding: "11px 16px",
                maxWidth: 384
            }
        } : {
            display: "flex",
            flexDirection: "row-reverse",
            "& .MuiTypography-root": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                padding: "11px 15px",
                maxWidth: 384
            }
        }
    ),
    myMessageCommon: {
        marginTop: 10,
        "& .MuiTypography-root": {
            borderRadius: props => props.isParticipantMessage ? "16px 16px 16px 0px" : "16px 16px 0px 16px"
        }
    },
    myMessageWithTweet: {
        "& .MuiTypography-root": {
            borderRadius: props => props.isParticipantMessage ? "0px 0px 16px 0px" : "0px 0px 0px 16px"
        }
    },
    myMessageDate: (props) => (
        props.isParticipantMessage ? {
            marginLeft: 50,
            marginTop: 5
        } : {
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: 5,
            "& svg": {
                marginLeft: 5,
                height: "1.2em",
                color: theme.palette.primary.main
            }
        }
    )
}));
