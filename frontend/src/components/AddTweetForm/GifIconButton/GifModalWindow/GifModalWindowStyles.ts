import { makeStyles } from "@material-ui/core";

export const useGifModalWindowStyles = makeStyles(() => ({
    imageListItem: {
        "& .MuiImageListItemBar-root": {
            backgroundColor: "transparent"
        },
        "& .MuiTypography-root": {
            color: "rgb(255, 255, 255)"
        },
        "&:hover": {
            cursor: "pointer"
        }
    }
}));
