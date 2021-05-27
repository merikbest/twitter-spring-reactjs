import React, {FC, ReactElement} from 'react';
import Grid from '@material-ui/core/Grid';
import {
    Avatar,
    Button,
    Container,
    createStyles,
    Divider,
    InputAdornment,
    InputBase,
    List,
    ListItem,
    ListItemAvatar, ListItemText,
    makeStyles,
    Paper,
    Typography,
    withStyles
} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import Tweet from "../../components/Tweet/Tweet";
import SideMenu from "../../components/SideMenu/SideMenu";
import SearchIcon from "@material-ui/icons/Search";
import {SearchTextField} from '../../components/SearchTextField';
import { useHomeStyles } from './HomeStyles';
import { AddTweetForm } from '../../components/AddTweetForm/AddTweetForm';


const Home: FC = (): ReactElement => {
    const classes = useHomeStyles();

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
                                <AddTweetForm classes={classes} />
                            </div>
                            <div className={classes.addFormBottomLine}/>
                        </Paper>
                        {/*{isLoading ? (*/}
                        {/*    <div className={classes.tweetsCentred}>*/}
                        {/*        <CircularProgress />*/}
                        {/*    </div>*/}
                        {/*) : (*/}
                        {/*    tweets.map((tweet) => (*/}
                        {/*        <Tweet key={tweet._id} text={tweet.text} user={tweet.user} classes={classes} />*/}
                        {/*    ))*/}
                        {/*)}*/}
                        <Tweet
                            classes={classes}
                            text={"Hello. How Low?"}
                            user={{
                                fullname: "Kurt Cobain",
                                username: "kurtcobain",
                                avatarUrl: "https://i0.wp.com/liveforlivemusic.com/wp-content/uploads/2017/04/Screen-Shot-2018-04-04-at-5.39.27-PM.png?resize=740%2C390&ssl=1"
                            }}/>
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
                        <Paper className={classes.rightSideBlock}>
                            <Paper className={classes.rightSideBlockHeader} variant="outlined">
                                <b>Актуальные темы</b>
                            </Paper>
                            <List>
                                <ListItem className={classes.rightSideBlockItem}>
                                    <ListItemText
                                        primary="Санкт-Петербург"
                                        secondary={
                                            <Typography component="span" variant="body2" color="textSecondary">
                                                Твитов: 3 331
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                <Divider component="li"/>
                                <ListItem className={classes.rightSideBlockItem}>
                                    <ListItemText
                                        primary="#коронавирус"
                                        secondary={
                                            <Typography component="span" variant="body2" color="textSecondary">
                                                Твитов: 163 122
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                <Divider component="li"/>
                                <ListItem className={classes.rightSideBlockItem}>
                                    <ListItemText
                                        primary="Беларусь"
                                        secondary={
                                            <Typography component="span" variant="body2" color="textSecondary">
                                                Твитов: 13 554
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                <Divider component="li"/>
                            </List>
                        </Paper>
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
