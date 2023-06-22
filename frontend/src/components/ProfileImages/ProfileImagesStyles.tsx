import { makeStyles, Theme } from "@material-ui/core";

interface ProfileImagesStylesProps {
    dataSize: number;
}

export const useProfileImagesStyles = makeStyles<Theme, ProfileImagesStylesProps>(() => ({
    container: {
        paddingTop: 23,
        paddingLeft: 12
    },
    imageList: {
        overflow: "hidden",
        borderRadius: 16,
        width: 350
    },
    img: {
        objectFit: "cover",
        width: "100%",
        height: "100%"
    },
    item1: {
        "&.MuiImageListItem-root": {
            paddingRight: "1px !important",
            paddingBottom: props => (props.dataSize >= 3) ? "1px !important" : "0px !important"
        }
    },
    item2: {
        "&.MuiImageListItem-root": {
            paddingLeft: "1px !important",
            paddingBottom: props => (props.dataSize >= 3) ? "1px !important" : "0px !important"
        }
    },
    item3: {
        "&.MuiImageListItem-root": {
            paddingTop: props => (props.dataSize === 3 || props.dataSize === 4) ? "1px !important" : "0px !important",
            paddingRight: props => (props.dataSize === 4) ? "1px !important" : "0px !important",
            paddingBottom: props => (props.dataSize >= 5) ? "1px !important" : "0px !important",
            paddingLeft: props => (props.dataSize >= 5) ? "2px !important" : "0px !important"
        }
    },
    item4: {
        "&.MuiImageListItem-root": {
            paddingTop: "1px !important",
            paddingLeft: props => (props.dataSize === 4) ? "1px !important" : "0px !important",
            paddingRight: props => (props.dataSize >= 5) ? "1px !important" : "0px !important"
        }
    },
    item5: {
        "&.MuiImageListItem-root": {
            paddingTop: "1px !important",
            paddingLeft: "1px !important"
        }
    },
    item6: {
        "&.MuiImageListItem-root": {
            paddingTop: "1px !important",
            paddingLeft: "2px !important"
        }
    }
}));