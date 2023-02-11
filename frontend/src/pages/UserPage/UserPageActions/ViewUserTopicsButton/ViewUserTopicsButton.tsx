import React, {FC, memo, ReactElement} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {selectUserProfileId} from "../../../../store/ducks/userProfile/selectors";
import {resetUserProfileState} from "../../../../store/ducks/userProfile/actionCreators";
import {PROFILE, TOPICS} from "../../../../util/pathConstants";
import UserItemAction from "../UserItemAction/UserItemAction";
import {TopicIcon} from "../../../../icons";

const ViewUserTopicsButton: FC = memo((): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userProfileId = useSelector(selectUserProfileId);

    const onClickViewUserTopics = (): void => {
        dispatch(resetUserProfileState());
        history.push(`${PROFILE}/${userProfileId}${TOPICS}`);
    };

    return (
        <div onClick={onClickViewUserTopics}>
            <UserItemAction title={"View Topics"} icon={TopicIcon}/>
        </div>
    );
});

export default ViewUserTopicsButton;
