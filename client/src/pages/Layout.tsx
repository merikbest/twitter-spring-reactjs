import React, {FC, ReactElement} from 'react';
import {useDispatch} from 'react-redux';
import {Container, Grid, InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined';

import {useHomeStyles} from './Home/HomeStyles';
import {SearchTextField} from '../components/SearchTextField';
import {fetchTweets} from '../store/ducks/tweets/actionCreators';
import {fetchTags} from '../store/ducks/tags/actionCreators';
import SideMenu from "../components/SideMenu/SideMenu";
import Tags from "../components/Tags/Tags";
import Users from '../components/Users/Users';

interface Layout {
    children: React.ReactNode;
}

export const Layout: FC<Layout> = ({children}): ReactElement => {
    const classes = useHomeStyles();
    const dispatch = useDispatch();

    React.useEffect(() => {
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
                    {children}
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
                        <Tags classes={classes}/>
                        <Users />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};
