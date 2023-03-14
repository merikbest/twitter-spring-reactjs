import React from "react";
import { Radio } from "@material-ui/core";

import TweetDeckTeams from "../TweetDeckTeams";
import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";

describe("TweetDeckTeams", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetDeckTeams />, createMockRootState());

        expect(wrapper.text().includes("Invite anyone to Tweet from this account using the Teams feature in TweetDeck.")).toBe(true);
        expect(wrapper.text().includes("Turn on TweetDeck Teams")).toBe(true);
        expect(wrapper.text().includes("Allow anyone to add you to their team")).toBe(true);
        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(true);
        expect(wrapper.text().includes("Only allow people you follow to add you to their team")).toBe(true);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(false);

        wrapper.find(Radio).at(1).find("input").simulate("change");

        expect(wrapper.find(Radio).at(0).prop("checked")).toBe(false);
        expect(wrapper.find(Radio).at(1).prop("checked")).toBe(true);
    });
});
