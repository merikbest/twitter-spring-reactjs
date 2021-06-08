import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Divider, List, ListItem, ListItemText, Paper, Typography} from "@material-ui/core";

import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {selectIsTagsLoaded, selectTagsItems} from "../../store/ducks/tags/selectors";
import {Tag} from "../../store/ducks/tags/contracts/state";


interface TagsProps {
    classes: ReturnType<typeof useHomeStyles>;
}

const Tags: FC<TagsProps> = ({classes}: TagsProps): ReactElement | null => {
    const tags = useSelector(selectTagsItems);
    const isLoaded = useSelector(selectIsTagsLoaded);

    if (!isLoaded) {
        return null;
    }

    return (
        <Paper className={classes.rightSideBlock}>
            <Paper className={classes.rightSideBlockHeader} variant="outlined">
                <b>Актуальные темы</b>
            </Paper>
            <List>
                {tags.map((tag: Tag) => (
                    <React.Fragment key={tag.id}>
                        <ListItem className={classes.rightSideBlockItem}>
                            <Link to={`/home/search?1=${tag.name}`}>
                                <ListItemText
                                    primary={tag.name}
                                    secondary={
                                        <Typography component="span" variant="body2" color="textSecondary">
                                            Твитов: {tag.count}
                                        </Typography>
                                    }
                                />
                            </Link>
                        </ListItem>
                        <Divider component="li"/>
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default Tags;
