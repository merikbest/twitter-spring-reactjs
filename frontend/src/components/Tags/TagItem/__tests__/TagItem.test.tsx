import React from "react";
import { Link } from "react-router-dom";
import { createMemoryHistory } from "history";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockTags } from "../../../../util/test-utils/mock-test-data";
import { SEARCH } from "../../../../constants/path-constants";
import { LoadingStatus } from "../../../../types/common";
import TagItem from "../TagItem";

describe("TagItem", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockTag = mockTags[0];

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<TagItem tag={mockTag} />, mockRootState);
        expect(wrapper.text().includes(mockTag.tagName)).toBe(true);
        expect(wrapper.text().includes(`${mockTag.tweetsQuantity} Tweets`)).toBe(true);
    });

    it("should click link", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<TagItem tag={mockTag} />, mockRootState, history);

        wrapper.find(Link).simulate("click", { button: 0 });

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith({ pathname: SEARCH, state: { tag: mockTag.tagName } });
    });
});
