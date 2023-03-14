import { makeStyles, Theme } from "@material-ui/core";

interface UseFollowedTopicButtonStyles {
    isTopicFollowed: boolean;
    isTopicNotInterested: boolean;
}

export const useFollowedTopicItemButton = makeStyles<Theme, UseFollowedTopicButtonStyles>((theme) => ({
    topicItem: {
        "& .MuiButtonGroup-root": {
            opacity: props => props.isTopicNotInterested ? 0.5 : 1,
            padding: "4px 0px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start"
        },
        "& .MuiTypography-h6": {
            color: props => props.isTopicFollowed && theme.palette.common.white,
            fontWeight: 700,
            marginRight: 12
        },
        "& .MuiButton-label": {
            justifyContent: "space-between"
        },
        "& #checkIcon": {
            fill: theme.palette.common.white
        },
        "& svg": {
            width: "1.172rem",
            height: "1.172rem",
            fill: (props: { isTopicNotInterested: any; }) => props.isTopicNotInterested ? theme.palette.background.default : theme.palette.primary.main,
            transition: "fill 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        },
        "& hr": {
            backgroundColor: props => props.isTopicFollowed ? theme.palette.primary.main : theme.palette.divider,
            transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        },
        "&:hover .MuiButton-root": {
            backgroundColor: props => props.isTopicFollowed && theme.palette.primary.dark
        },
        "&:hover svg": {
            fill: (props: { isTopicFollowed: any; }) => props.isTopicFollowed && theme.palette.primary.dark
        },
        "&:hover hr": {
            backgroundColor: props => props.isTopicFollowed && theme.palette.primary.dark
        },
        "& .MuiButton-root:hover": {
            backgroundColor: props => props.isTopicFollowed ? theme.palette.primary.dark : theme.palette.secondary.light
        }
    },
    topicItemTextInfo: {
        "&.MuiButtonBase-root": {
            backgroundColor: props => props.isTopicNotInterested ? theme.palette.background.default :
                props.isTopicFollowed ? theme.palette.primary.main : theme.palette.background.default,
            flexGrow: 1,
            flexBasis: 0,
            height: 40,
            padding: "7px 12px 7px 16px",
            borderTop: "1px solid rgb(185, 202, 211)",
            borderBottom: "1px solid rgb(185, 202, 211)",
            borderLeft: "1px solid rgb(185, 202, 211)"
        }
    },
    topicItemCloseButton: {
        "&.MuiButtonBase-root": {
            backgroundColor: props => props.isTopicNotInterested ? theme.palette.background.default :
                props.isTopicFollowed ? theme.palette.primary.main : theme.palette.background.default,
            height: 40,
            borderTop: "1px solid rgb(185, 202, 211)",
            borderBottom: "1px solid rgb(185, 202, 211)",
            borderRight: "1px solid rgb(185, 202, 211)",
            borderLeftStyle: "unset",
            padding: "0px 12px 0px 0px",
            minWidth: 1,
            "& hr": {
                marginRight: 12
            },
            "& svg": {
                fill: (props: { isTopicNotInterested: any; isTopicFollowed: any; }) => props.isTopicNotInterested ? theme.palette.background.default :
                    props.isTopicFollowed ? theme.palette.primary.main : "rgb(185, 202, 211)",
                transition: "fill 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            }
        }
    }
}));
