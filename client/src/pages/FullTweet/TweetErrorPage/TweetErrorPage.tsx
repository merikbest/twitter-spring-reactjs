import React, {FC, ReactElement, useEffect} from "react";
import {useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";

import {useTweetErrorPageStyles} from "./TweetErrorPageStyles";
import {selectErrorMessage} from "../../../store/ducks/tweet/selectors";
import {SnackbarProps, withSnackbar} from "../../../hoc/withSnackbar";
import ActionSnackbar from "../../../components/ActionSnackbar/ActionSnackbar";
import {SEARCH} from "../../../util/pathConstants";
import {useGlobalStyles} from "../../../util/globalClasses";

const TweetErrorPage: FC<SnackbarProps> = ({onCloseSnackBar, setOpenSnackBar, openSnackBar}): ReactElement => {
    const classes = useTweetErrorPageStyles();
    const globalClasses = useGlobalStyles();
    const errorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        setOpenSnackBar!(true);
    }, []);

    return (
        <>
            <Typography variant={"h5"} component={"div"} className={classes.error}>
                Hmm...this page doesn’t exist. <br/>
                Try searching for something else.
            </Typography>
            <Link to={SEARCH} className={globalClasses.link}>
                <Button
                    className={classes.searchButton}
                    color="primary"
                    variant="contained"
                    size="small"
                >
                    Search
                </Button>
            </Link>
            <ActionSnackbar
                onCloseSnackBar={onCloseSnackBar!}
                openSnackBar={openSnackBar!}
                snackBarMessage={errorMessage}
            />
        </>
    );
};

export default withSnackbar(TweetErrorPage);
