import React, {FC, ReactElement} from 'react';
import {CircularProgress} from "@material-ui/core";

import {useSpinnerStyles} from "./SpinnerStyles";

interface SpinnerProps {
    paddingTop?: number;
}

const Spinner: FC<SpinnerProps> = ({paddingTop}): ReactElement => {
    const classes = useSpinnerStyles({paddingTop});

    return (
        <div className={classes.loading}>
            <CircularProgress/>
        </div>
    );
};

export default Spinner;
