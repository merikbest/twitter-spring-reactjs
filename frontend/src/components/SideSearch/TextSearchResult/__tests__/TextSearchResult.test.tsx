import React from "react";
import { createMemoryHistory } from "history";
import { ListItem } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import TextSearchResult from "../TextSearchResult";
import { SEARCH } from "../../../../constants/path-constants";

describe("TextSearchResult", () => {

    it("should click search result text", () => {
        testClickSearchResult("test");
    });

    it("should click search result hashtag", () => {
        testClickSearchResult("#test");
    });

    const testClickSearchResult = (text: string): void => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<TextSearchResult text={text} tweetCount={123} recentSearch />, createMockRootState(), history);
        expect(wrapper.text().includes(text)).toBe(true);
        wrapper.find(ListItem).simulate("click");
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith({
            pathname: SEARCH,
            state: (Array.from(text)[0] === "#") ? { tag: text } : { text: text }
        });
    };
});
