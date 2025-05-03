import React, { FC, ReactElement } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { IconButton, InputAdornment, Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { MainSearchTextField } from "../../components/SearchTextField/MainSearchTextField";
import BackButton from "../../components/BackButton/BackButton";
import { useExploreStyles } from "./ExploreStyles";
import { EditIcon, SearchIcon } from "../../icons";
import { useGlobalStyles } from "../../util/globalClasses";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import PageHeaderWrapper from "../../components/PageHeaderWrapper/PageHeaderWrapper";
import UsersList from "./UsersList";
import TweetsList from "./TweetsList";
import { useExplore } from "./useExplore";

const Explore: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useExploreStyles();
    const { t } = useTranslation();
    const {
        pageNumber,
        tweetsSize,
        tweetsPagesCount,
        usersPagesCount,
        searchText,
        activeTab,
        handleChangeTab,
        handleSubmitSearch,
        handleSearchText,
        loadTweets,
        showTopTweets,
        showUsers,
        showMediaTweets,
        showTweetsWithVideos
    } = useExplore();

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <PageHeaderWrapper>
                <div>
                    <form style={{ display: "block" }} onSubmit={handleSubmitSearch}>
                        <div className={classes.backButtonWrapper}>
                            <BackButton />
                        </div>
                        <MainSearchTextField
                            variant="outlined"
                            placeholder={t("EXPLORE_TWITTER", { defaultValue: "Explore Twitter" })}
                            onChange={handleSearchText}
                            value={searchText}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SearchIcon}
                                    </InputAdornment>
                                )
                            }}
                        />
                        <IconButton className={classes.editButton} color="primary" size="small">
                            <>{EditIcon}</>
                        </IconButton>
                    </form>
                    <div className={classes.tabs}>
                        <Tabs value={activeTab} onChange={handleChangeTab} indicatorColor="primary" textColor="primary">
                            <Tab onClick={showTopTweets} label={t("TOP", { defaultValue: "Top" })} />
                            <Tab onClick={showTopTweets} label={t("LATEST", { defaultValue: "Latest" })} />
                            <Tab onClick={showUsers} label={t("PEOPLE", { defaultValue: "People" })} />
                            <Tab onClick={showMediaTweets} label={t("PHOTOS", { defaultValue: "Photos" })} />
                            <Tab onClick={showTweetsWithVideos} label={t("VIDEOS", { defaultValue: "Videos" })} />
                        </Tabs>
                    </div>
                </div>
            </PageHeaderWrapper>
            <div className={classes.contentWrapper}>
                <InfiniteScroll
                    style={{ overflow: "unset" }}
                    dataLength={tweetsSize}
                    next={loadTweets}
                    hasMore={pageNumber < (activeTab === 2 ? usersPagesCount : tweetsPagesCount)}
                    loader={null}
                >
                    {(activeTab === 2) ? (
                        <UsersList />
                    ) : (
                        <TweetsList />
                    )}
                </InfiniteScroll>
            </div>
        </Paper>
    );
};

export default withDocumentTitle(Explore)("Explore");
