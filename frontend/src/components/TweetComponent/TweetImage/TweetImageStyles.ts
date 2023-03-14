import { makeStyles } from "@material-ui/core";

export const useTweetImageStyles = makeStyles((theme) => ({
    image: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 504,
            height: 252,
            borderRadius: 20,
            borderColor: theme.palette.info.light
        },
        "& .small": {
            width: 260
        }
    }
}));
