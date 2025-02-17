import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import PageHeaderTitle from "../../../components/PageHeaderTitle/PageHeaderTitle";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import { selectUserProfileUsername } from "../../../store/ducks/user/selectors";
import { useGlobalStyles } from "../../../util/globalClasses";

const BookmarksHeader = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const username = useSelector(selectUserProfileUsername);
    const { t } = useTranslation();

    return (
        <PageHeaderWrapper>
            <div className={globalClasses.pageHeaderTitleWrapper}>
                <PageHeaderTitle
                    title={t("BOOKMARKS", { defaultValue: "Bookmarks" })}
                    subtitle={`@${username}`}
                />
            </div>
        </PageHeaderWrapper>
    );
});

export default BookmarksHeader;
