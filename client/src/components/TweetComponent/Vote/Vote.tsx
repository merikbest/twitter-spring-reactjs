import React, {FC, ReactElement} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@material-ui/core";

import {useVoteStyles} from "./VoteStyles";
import {Poll} from "../../../store/ducks/tweets/contracts/state";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {fetchVote} from "../../../store/ducks/tweets/actionCreators";
import {voteFormatDate} from "../../../util/formatDate";

interface VoteProps {
    tweetId: string;
    poll?: Poll;
}

const Vote: FC<VoteProps> = ({tweetId, poll}): ReactElement => {
    const classes = useVoteStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);

    const userVoteSum = poll?.pollChoices.reduce((a, b) => a + b.votedUser.length, 0);
    const isUserVoted = poll?.pollChoices.map((pollChoice) =>
        pollChoice.votedUser.findIndex((user) => user.id === myProfile?.id)).filter(value => value !== -1);

    const onClickVote = (pollChoiceId: number): void => {
        dispatch(fetchVote({tweetId, pollChoiceId}))
    };

    return (
        <>
            {isUserVoted![0] === 0 ? (
                <>
                    {poll?.pollChoices.map((pollChoice) => {
                            const voteNumber = (pollChoice.votedUser.length / ((userVoteSum! === 0) ? 1 : userVoteSum!)) * 100;
                            return (
                                <div className={classes.container}>
                                    <div className={classes.voteOption}>
                                        <div className={classes.voteChoice}>
                                            {pollChoice.choice}
                                        </div>
                                        <div className={classes.voteChoice}>
                                            {`${(voteNumber === 0) ? 0 : voteNumber.toFixed(1)}%`}
                                        </div>
                                    </div>
                                    <div className={classes.voteScale}
                                         style={{width: `${(voteNumber === 0) ? 1 : voteNumber}%`}}></div>
                                </div>
                            );
                        }
                    )}
                    <div className={classes.voteInfo}>{userVoteSum} votes · {voteFormatDate(poll!)} left</div>
                </>
            ) : (
                <>
                    {poll?.pollChoices.map((pollChoice) => {
                            return (
                                <div className={classes.container}>
                                    <Button
                                        onClick={() => onClickVote(pollChoice.id)}
                                        className={classes.voteButton}
                                        color="primary"
                                        fullWidth
                                    >
                                        {pollChoice.choice}
                                    </Button>
                                </div>
                            );
                        }
                    )}
                    <div className={classes.voteInfo}>{userVoteSum} votes · {voteFormatDate(poll!)} left</div>
                </>
            )}
        </>
    );
};

export default Vote;
