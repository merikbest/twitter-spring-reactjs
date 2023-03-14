import React from "react";

import { mountWithStore } from "../../../../../util/test-utils/test-helper";
import UserItemAction from "../UserItemAction";
import { TopicIcon } from "../../../../../icons";

describe("UserItemAction", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserItemAction title={"View Topics"} icon={TopicIcon} />);
        expect(wrapper.text().includes("View Topics")).toBe(true);
    });
});
