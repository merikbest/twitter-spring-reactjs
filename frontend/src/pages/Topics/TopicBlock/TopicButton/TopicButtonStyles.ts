import { makeStyles, Theme } from "@material-ui/core";

interface UseTopicsButtonStyles {
    isTopicFollowed: boolean;
    isTopicNotInterested: boolean;
}

export const useTopicButtonStyles = makeStyles<Theme, UseTopicsButtonStyles>((theme) => ({
    topicItem: {
        opacity: props => props.isTopicNotInterested ? 0.5 : 1,
        padding: "4px 0px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        "& .MuiButtonBase-root": {
            backgroundColor: props => props.isTopicFollowed ? theme.palette.primary.main : theme.palette.background.default
        },
        "& .MuiTypography-h6": {
            color: props => props.isTopicFollowed && theme.palette.common.white,
            fontWeight: 700,
            marginRight: 12
        },
        "& .MuiButton-label": {
            justifyContent: "space-between"
        },
        "& svg": {
            width: "1.172rem",
            height: "1.172rem",
            fill: (props: { isTopicFollowed: any; isTopicNotInterested: any; }) =>
                props.isTopicNotInterested ? theme.palette.common.white :
                    props.isTopicFollowed ? theme.palette.common.white : theme.palette.primary.main
        },
        "& .MuiButton-root:hover": {
            backgroundColor: props => props.isTopicFollowed ? theme.palette.primary.dark : theme.palette.secondary.light
        }
    },
    topicItemTextInfo: {
        flexGrow: 1,
        flexBasis: 0,
        height: 40,
        padding: "7px 12px 7px 16px",
        border: `1px solid rgb(185, 202, 211)`
    }
}));
