import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { fetchUserProfile } from "../../../store/ducks/userProfile/actionCreators";
import { selectUserProfile, selectUsersIsSuccessLoaded } from "../../../store/ducks/userProfile/selectors";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { fetchUserListsById, resetListsState } from "../../../store/ducks/lists/actionCreators";
import { selectIsLoading, selectUserListsItems } from "../../../store/ducks/lists/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import ListsItem from "../ListsItem/ListsItem";
import { useGlobalStyles } from "../../../util/globalClasses";
import { PROFILE } from "../../../constants/path-constants";
import { withDocumentTitle } from "../../../hoc/withDocumentTitle";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import EmptyPageDescription from "../../../components/EmptyPageDescription/EmptyPageDescription";
import PageHeaderTitle from "../../../components/PageHeaderTitle/PageHeaderTitle";

const ListsMemberships: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ id: string }>();
    const myProfileId = useSelector(selectUserDataId);
    const userProfile = useSelector(selectUserProfile);
    const isUserProfileLoaded = useSelector(selectUsersIsSuccessLoaded);
    const lists = useSelector(selectUserListsItems);
    const isListsLoading = useSelector(selectIsLoading);
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchUserProfile(Number(params.id)));

        return () => {
            dispatch(resetListsState());
        };
    }, [params]);

    useEffect(() => {
        if (isUserProfileLoaded && userProfile) {
            if ((userProfile.isPrivateProfile && !userProfile.isFollower) || userProfile.isMyProfileBlocked) {
                history.push(`${PROFILE}/${userProfile.id}`);
            } else {
                dispatch(fetchUserListsById(Number(params.id)));
            }
        }
    }, [isUserProfileLoaded]);

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <PageHeaderWrapper backButton>
                <PageHeaderTitle
                    title={(myProfileId === userProfile?.id)
                        ? t("LISTS_YOU_ARE_ON", { defaultValue: "Lists you’re on" })
                        : t("LISTS_THEY_ARE_ON", { defaultValue: "Lists they’re on" })
                    }
                    subtitle={`@${userProfile?.username}`}
                />
            </PageHeaderWrapper>
            <div className={globalClasses.contentWrapper}>
                {(isListsLoading && !lists.length) ? (
                    <Spinner />
                ) : (
                    (!isListsLoading && !lists.length) ? (
                        <EmptyPageDescription
                            title={(myProfileId === userProfile?.id) ? (
                                t("EMPTY_USER_LISTS_MEMBERS_TITLE", {
                                    defaultValue: "You haven’t been added to any Lists yet"
                                })
                            ) : (
                                t("EMPTY_LISTS_MEMBERS_TITLE", {
                                    username: userProfile?.username,
                                    defaultValue: `@${userProfile?.username} hasn’t created any Lists`
                                })
                            )}
                            subtitle={(myProfileId === userProfile?.id) ? (
                                t("EMPTY_USER_LISTS_MEMBERS_DESCRIPTION", {
                                    defaultValue: "When someone adds you to a List, it’ll show up here."
                                })
                            ) : (
                                t("EMPTY_LISTS_MEMBERS_DESCRIPTION", {
                                    defaultValue: "When they do, they’ll show up here."
                                })
                            )}
                        />
                    ) : (
                        lists.map((list) => <ListsItem key={list.id} list={list} />)
                    )
                )}
            </div>
        </Paper>
    );
};

export default withDocumentTitle(ListsMemberships)("Lists");
