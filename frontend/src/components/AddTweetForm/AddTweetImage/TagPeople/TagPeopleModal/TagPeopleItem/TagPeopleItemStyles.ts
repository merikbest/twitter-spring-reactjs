import { makeStyles, Theme } from "@material-ui/core";

interface TagPeopleItemStylesProps {
    isUserCanTagged: boolean
}

export const useTagPeopleItemStyles = makeStyles<Theme, TagPeopleItemStylesProps>((theme) => ({
    container: {
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        paddingLeft: 15,
        marginTop: 4,
        marginBottom: 4,
        cursor: props => props.isUserCanTagged ? "default" : "pointer",
        opacity: props => props.isUserCanTagged ? 0.5 : 1
    },
    listAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: 15
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerInfo: {
        width: 350
    },
    checkIcon: {
        float: "right",
        "& svg": {
            color: theme.palette.primary.main,
            marginTop: 5,
            height: "1.3em"
        }
    }
}));
