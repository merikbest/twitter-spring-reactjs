import React, { memo, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import { useRetweetIconButtonStyles } from "./RetweetIconButtonStyles";
import { selectIsTweetRetweeted } from "../../../store/ducks/tweet/selectors";
import { RetweetIcon, RetweetOutlinedIcon } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import { retweet } from "../../../store/ducks/tweets/actionCreators";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";

const RetweetIconButton = memo((): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const isTweetRetweeted = useSelector(selectIsTweetRetweeted);
    const globalClasses = useGlobalStyles({});
    const classes = useRetweetIconButtonStyles({ isTweetRetweeted: isTweetRetweeted! });

    const handleRetweet = (): void => {
        dispatch(retweet({ tweetId: parseInt(params.id) }));
    };

    return (
        <div className={classnames(globalClasses.svgLarge, classes.retweetIcon)}>
            <ActionIconButton
                actionText={isTweetRetweeted ? "Undo Retweet" : "Retweet"}
                onClick={handleRetweet}
                icon={isTweetRetweeted ? RetweetIcon : RetweetOutlinedIcon}
            />
        </div>
    );
});

export default RetweetIconButton;
