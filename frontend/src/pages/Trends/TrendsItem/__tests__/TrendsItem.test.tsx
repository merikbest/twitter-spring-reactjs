import React from "react";
import { Link } from "react-router-dom";
import { createMemoryHistory } from "history";
import { ListItemText } from "@material-ui/core";

import TrendsItem from "../TrendsItem";
import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockTags } from "../../../../util/test-utils/mock-test-data";

describe("TrendsItem", () => {

    it("should render correctly", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const mockTag = mockTags[0];
        const wrapper = mountWithStore(<TrendsItem tag={mockTag} />, createMockRootState(), history);

        wrapper.find(Link).at(0).simulate("click", { button: 0 });

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith({ pathname: "/search", state: { tag: mockTag.tagName } });
        expect(wrapper.find(ListItemText).prop("primary")).toBe(mockTag.tagName);
        expect(wrapper.text().includes(`${mockTag.tweetsQuantity} Tweets`)).toBe(true);
    });
});
