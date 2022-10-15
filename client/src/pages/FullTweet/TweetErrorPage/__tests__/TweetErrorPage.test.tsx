import React from "react";
import {createMemoryHistory} from "history";
import {Link} from "react-router-dom";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import TweetErrorPage from "../TweetErrorPage";
import {LoadingStatus} from "../../../../store/types";
import ActionSnackbar from "../../../../components/ActionSnackbar/ActionSnackbar";
import {SEARCH} from "../../../../util/pathConstants";

describe("TweetErrorPage", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetErrorPage/>, {
            ...mockStore,
            tweet: {...mockStore.tweet, errorMessage: "Tweet not found"}
        });
        expect(wrapper.text().includes("Hmm...this page doesn’t exist.")).toBe(true);
        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
        expect(wrapper.find(ActionSnackbar).prop("snackBarMessage")).toBe("Tweet not found");
    });

    it("should click link", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<TweetErrorPage/>, mockStore, history);
        wrapper.find(Link).simulate("click", {button: 0});
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(SEARCH);
    });
});
