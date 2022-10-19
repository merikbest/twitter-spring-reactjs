import {makeStyles, Theme} from "@material-ui/core";

export const useMembersAndFollowersStyles = makeStyles((theme: Theme) => ({
    listMembers: {
        marginLeft: 20,
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
        },
    },
}));
