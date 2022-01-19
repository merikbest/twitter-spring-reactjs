import {makeStyles, Theme} from "@material-ui/core";

export const useSpacesStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    title: {
        paddingBottom: 4,
        fontWeight: 700,
    },
    switch: {
        marginTop: -9,
        float: "right",
    },
}));
