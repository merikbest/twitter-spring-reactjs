import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from '@material-ui/core/Grid';
import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    Divider,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography
} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import SearchIcon from "@material-ui/icons/Search";

import Tweet from "../../components/Tweet/Tweet";
import SideMenu from "../../components/SideMenu/SideMenu";
import {SearchTextField} from '../../components/SearchTextField';
import {useHomeStyles} from './HomeStyles';
import {AddTweetForm} from '../../components/AddTweetForm/AddTweetForm';
import {fetchTweets} from "../../store/ducks/tweets/actionCreators";
import {selectIsTweetsLoading, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {fetchTags} from "../../store/ducks/tags/actionCreators";
import Tags from "../../components/Tags/Tags";
import {selectTagsItems} from "../../store/ducks/tags/selectors";
import {Route} from "react-router-dom";

const Home: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useHomeStyles();
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);

    useEffect(() => {
        dispatch(fetchTweets());
        dispatch(fetchTags());
    }, [dispatch]);

    return (
        <Container className={classes.wrapper} maxWidth="lg">
            <Grid container spacing={3}>
                <Grid sm={1} md={3} item>
                    <SideMenu classes={classes}/>
                </Grid>
                <Grid sm={8} md={6} item>
                    <Paper className={classes.tweetsWrapper} variant="outlined">
                        <Paper className={classes.tweetsHeader} variant="outlined">
                            <Typography variant="h6">Главная</Typography>
                        </Paper>
                        <Paper>
                            <div className={classes.addForm}>
                                <AddTweetForm classes={classes}/>
                            </div>
                            <div className={classes.addFormBottomLine}/>
                        </Paper>
                        <Route exact path={"/home"}>
                            {isLoading ? (
                                <div className={classes.tweetsCentred}><CircularProgress /></div>
                            ) : tweets.map(tweet => (
                                <Tweet key={tweet._id} classes={classes} text={tweet.text} user={tweet.user}/>
                            ))}
                        </Route>
                    </Paper>
                </Grid>
                <Grid sm={3} md={3} item>
                    <div className={classes.rightSide}>
                        <SearchTextField
                            variant="outlined"
                            placeholder="Поиск по Твиттеру"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                        <Tags classes={classes} />
                        <Paper className={classes.rightSideBlock}>
                            <Paper className={classes.rightSideBlockHeader} variant="outlined">
                                <b>Кого читать</b>
                            </Paper>
                            <List>
                                <ListItem className={classes.rightSideBlockItem}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="https://pbs.twimg.com/profile_images/1267938486566428673/US6KRPbA_normal.jpg"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Dock Of Shame"
                                        secondary={
                                            <Typography component="span" variant="body2" color="textSecondary">
                                                @FavDockOfShame
                                            </Typography>
                                        }
                                    />
                                    <Button color="primary">
                                        <PersonAddIcon/>
                                    </Button>
                                </ListItem>
                                <Divider component="li"/>
                            </List>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
