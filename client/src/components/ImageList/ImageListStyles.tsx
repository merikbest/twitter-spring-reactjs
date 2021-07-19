import {makeStyles, Theme} from "@material-ui/core";

export const useImageListStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        flexWrap: 'wrap',
    },
    item: {
        width: 50,
        height: 50,
        marginRight: 10,
        marginBottom: 10,
        position: 'relative',
        '& img': {
            width: '100%',
            height: '100%',
            'object-fit': 'cover',
            borderRadius: 6,
        },
        '& svg': {
            color: "red",
            height: "1.3em",
        },
    },
    itemRemove: {
        position: 'absolute',
        top: -8,
        right: -6,
        padding: '0 !important',
        backgroundColor: '#ff4d4d !important',
    },
}));
