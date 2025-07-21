import React, { FC, ReactElement } from "react";
import { Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Spinner from "../../../components/Spinner/Spinner";
import ListsItem from "../ListsItem";
import { useGlobalStyles } from "../../../util/globalClasses";
import { withDocumentTitle } from "../../../hoc/withDocumentTitle";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import EmptyPageDescription from "../../../components/EmptyPageDescription/EmptyPageDescription";
import PageHeaderTitle from "../../../components/PageHeaderTitle/PageHeaderTitle";
import { useListsMemberships } from "./useListsMemberships";

const ListsMemberships: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();
    const { lists, isListsLoading, myProfileId, userProfile } = useListsMemberships();

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
