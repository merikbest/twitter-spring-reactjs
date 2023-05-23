import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { createMemoryHistory } from "history";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import { mockQuoteTweet } from "../../../util/test-utils/mock-test-data";
import { HOME_TWEET } from "../../../constants/path-constants";
import Quote from "../Quote";
import { LoadingStatus } from "../../../types/common";

describe("Quote", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly Quoted and FullTweet", () => {
        const wrapper = mountWithStore(<Quote quoteTweet={mockQuoteTweet} />, mockRootState);

        expect(wrapper.find(Avatar).prop("src")).toBe(mockQuoteTweet.user.avatar);
        expect(wrapper.text().includes(mockQuoteTweet.user.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockQuoteTweet.user.username}`)).toBe(true);
        expect(wrapper.text().includes("#JavaScript")).toBe(true);
    });

    it("should click link and go to Tweet page", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<Quote quoteTweet={mockQuoteTweet} />, mockRootState, history);

        wrapper.find(Link).simulate("click", { button: 0 });

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${HOME_TWEET}/${mockQuoteTweet.id}`);
    });
});
