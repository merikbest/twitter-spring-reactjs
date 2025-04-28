import React, { FC, ReactElement } from "react";
import { Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import TweetComponent from "../../components/TweetComponent/TweetComponent";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import InfiniteScrollWrapper from "../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import EmptyPageDescription from "../../components/EmptyPageDescription/EmptyPageDescription";
import BookmarksHeader from "./BookmarksHeader";
import { useBookmarks } from "./useBookmarks";

const Bookmarks: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { tweets, isLoading, pagesCount, loadBookmarks } = useBookmarks();
    const { t } = useTranslation();

    return (
        <InfiniteScrollWrapper dataLength={tweets.length} pagesCount={pagesCount} loadItems={loadBookmarks}>
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <BookmarksHeader />
                <div className={globalClasses.contentWrapper}>
                    {(isLoading && !tweets.length) ? (
                        <Spinner />
                    ) : (
                        (!isLoading && !tweets.length) ? (
                            <EmptyPageDescription
                                title={t("EMPTY_BOOKMARKS_TITLE", { defaultValue: "You haven’t added any Tweets to your Bookmarks yet" })}
                                subtitle={t("EMPTY_BOOKMARKS_SUBTITLE", { defaultValue: "When you do, they’ll show up here." })}
                            />
                        ) : (
                            <>
                                {tweets.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet} />)}
                                {isLoading && <Spinner />}
                            </>
                        )
                    )}
                </div>
            </Paper>
        </InfiniteScrollWrapper>
    );
};

export default withDocumentTitle(Bookmarks)("Bookmarks");
