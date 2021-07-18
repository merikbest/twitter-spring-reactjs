import {makeStyles, Theme} from "@material-ui/core";

export const useBackButtonStyles = makeStyles((theme: Theme) => ({
    container: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            marginRight: 20,
            marginLeft: 10,
            width: 40,
            height: 40,
            color: "rgb(29, 161, 242)",
            "& span": {
                paddingTop: 3,
                "& svg" : {
                    height: "0.90em",
                },
            },
        },
    },
}));
