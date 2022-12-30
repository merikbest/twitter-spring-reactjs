import React from "react";

import {mountWithStore} from "../../../../../util/testHelper";
import ChatUserBlocked from "../ChatUserBlocked";

describe("ChatUserBlocked", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ChatUserBlocked/>);
        expect(wrapper.text().includes("You can no longer send messages to this person.")).toBe(true);
        expect(wrapper.text().includes("Learn more")).toBe(true);
    });
});
