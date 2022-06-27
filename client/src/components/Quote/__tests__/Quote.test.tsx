import React from "react";
import {Avatar} from "@material-ui/core";
import {Link} from "react-router-dom";
import {createMemoryHistory} from "history";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import {mockQuoteTweet} from "../../../util/mockData/mockData";
import {HOME_TWEET} from "../../../util/pathConstants";
import Quote from "../Quote";

describe("Quote", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly Quoted and FullTweet", () => {
        const wrapper = mountWithStore(
            <Quote
                quoteTweet={mockQuoteTweet}
                isTweetQuoted
                isFullTweet
            />, mockRootState);

        expect(wrapper.find(Avatar).prop("src")).toBe(mockQuoteTweet.user.avatar.src);
        expect(wrapper.text().includes(mockQuoteTweet.user.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockQuoteTweet.user.username}`)).toBe(true);
        expect(wrapper.text().includes("#JavaScript")).toBe(true);
    });

    it("should render correctly not Quoted and not FullTweet", () => {
        const wrapper = mountWithStore(
            <Quote
                quoteTweet={mockQuoteTweet}
                isTweetQuoted={false}
                isFullTweet={false}
            />, mockRootState);

        expect(wrapper.find(Avatar).prop("src")).toBe(mockQuoteTweet.user.avatar.src);
        expect(wrapper.text().includes(mockQuoteTweet.user.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockQuoteTweet.user.username}`)).toBe(true);
        expect(wrapper.text().includes("#JavaScript")).toBe(true);
    });

    it("should click link and go to Tweet page", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(
            <Quote
                quoteTweet={mockQuoteTweet}
                isTweetQuoted
                isFullTweet
            />, mockRootState, history);

        wrapper.find(Link).simulate("click", {button: 0});

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${HOME_TWEET}/${mockQuoteTweet.id}`);
    });
});
