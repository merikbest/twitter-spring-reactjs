import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Paper } from "@material-ui/core";

import ConnectToUsers from "../../components/ConnectToUsers/ConnectToUsers";
import { fetchUserProfile } from "../../store/ducks/userProfile/actionCreators";
import { selectUserProfile } from "../../store/ducks/userProfile/selectors";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import { UserResponse } from "../../types/user";
import { PROFILE, USER } from "../../constants/path-constants";
import PageHeaderWrapper from "../../components/PageHeaderWrapper/PageHeaderWrapper";
import EmptyPageDescription from "../../components/EmptyPageDescription/EmptyPageDescription";
import PageHeaderTitle from "../../components/PageHeaderTitle/PageHeaderTitle";
import { FollowerUserApi } from "../../services/api/user-service/followerUserApi";

const FollowersYouKnow: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const history = useHistory();
    const userProfile = useSelector(selectUserProfile);
    const myProfileId = useSelector(selectUserDataId);
    const [overallFollowers, setOverallFollowers] = useState<UserResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        dispatch(fetchUserProfile(parseInt(params.id)));
        setOverallFollowers([]);
        setIsLoading(true);
        FollowerUserApi.overallFollowers(params.id)
            .then(response => {
                setOverallFollowers(response.data);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (userProfile?.isPrivateProfile) {
            history.push(`${PROFILE}/${params.id}`);
        }
    }, [userProfile]);

    useEffect(() => {
        if (parseInt(params.id) === myProfileId) {
            history.push(`${USER}/${myProfileId}/followers`);
        }
    }, [myProfileId]);

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <PageHeaderWrapper backButton>
                {!isLoading && (
                    <PageHeaderTitle
                        title={userProfile?.fullName!}
                        subtitle={`@${userProfile?.username}`}
                    />
                )}
            </PageHeaderWrapper>
            {(isLoading && (overallFollowers.length === 0)) ? (
                <Spinner paddingTop={150} />
            ) : (
                (!isLoading && (overallFollowers.length === 0)) ? (
                    <div className={globalClasses.contentWrapper}>
                        <EmptyPageDescription
                            title={`@${userProfile?.username} doesn’t have any followers you know yet`}
                            subtitle={"When someone you know follows them, they’ll be listed here."}
                        />
                    </div>
                ) : (
                    <ConnectToUsers
                        title={"Followers you know"}
                        isUsersLoading={isLoading}
                        users={overallFollowers}
                    />
                )
            )}
        </Paper>
    );
};

export default FollowersYouKnow;
