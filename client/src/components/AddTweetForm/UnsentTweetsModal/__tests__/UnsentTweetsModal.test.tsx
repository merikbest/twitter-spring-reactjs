import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {Button, Checkbox, Dialog} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import UnsentTweetsModal from "../UnsentTweetsModal";
import Spinner from "../../../Spinner/Spinner";
import {API_URL} from "../../../../util/url";
import {mockTweets} from "../../../../util/mockData/mockData";
import UnsentTweetItem from "../UnsentTweetItem/UnsentTweetItem";
import AddTweetForm from "../../AddTweetForm";
import DoneCallback = jest.DoneCallback;

describe("UnsentTweetsModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render empty Scheduled tweets", (done) => {
        testTabClick(done, 0, "Scheduled", "You don’t have any scheduled Tweets");
    });

    it("should render empty Unsent tweets", (done) => {
        testTabClick(done, 1, "Drafts", "You don’t have any unsent Tweets");
    });
    
    it("should render Scheduled tweets and open edit tweet modal", (done) => {
        const mock = new MockAdapter(axios);
        const wrapper = mountWithStore(<UnsentTweetsModal visible={true} onClose={jest.fn()}/>, mockRootState);
        mock.onGet(`${API_URL}/tweets/schedule`).reply(200, mockTweets);
        
        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(Spinner).exists()).toBe(false);
            expect(wrapper.find(UnsentTweetItem).length).toEqual(2);
            
            wrapper.find(UnsentTweetItem).at(0).simulate("click");

            expect(wrapper.find(Button).at(0).text().includes("Unsent Tweets")).toBe(true);
            expect(wrapper.text().includes("Unsent Tweets")).toBe(true);
            expect(wrapper.find(AddTweetForm).exists()).toBe(true);

            wrapper.find(Button).at(0).simulate("click");

            expect(wrapper.find(AddTweetForm).exists()).toBe(false);
        });
    });

    it("should select Scheduled tweets", (done) => {
        const mock = new MockAdapter(axios);
        const wrapper = mountWithStore(<UnsentTweetsModal visible={true} onClose={jest.fn()}/>, mockRootState);
        mock.onGet(`${API_URL}/tweets/schedule`).reply(200, mockTweets);
        mock.onDelete(`${API_URL}/tweets/schedule`, {data: [1, 15]}).reply(200, "deleted");

        setImmediate(() => {
            wrapper.update();
            done();

            wrapper.find(Button).at(0).simulate("click");

            expect(wrapper.find(Button).at(1).text().includes("Select All")).toBe(true);
            expect(wrapper.find(Button).at(2).text().includes("Delete")).toBe(true);
            expect(wrapper.find(Checkbox).at(0).prop("value")).toBe(1);
            expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(false);
            expect(wrapper.find(Checkbox).at(1).prop("value")).toBe(15);
            expect(wrapper.find(Checkbox).at(1).prop("checked")).toBe(false);

            wrapper.find(Button).at(1).simulate("click");
            
            expect(wrapper.find(Button).at(1).text().includes("Deselect All")).toBe(true);
            expect(wrapper.find(Checkbox).at(0).prop("value")).toBe(1);
            expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(true);
            expect(wrapper.find(Checkbox).at(1).prop("value")).toBe(15);
            expect(wrapper.find(Checkbox).at(1).prop("checked")).toBe(true);

            wrapper.find(Button).at(1).simulate("click");

            expect(wrapper.find(Button).at(1).text().includes("Select All")).toBe(true);
            expect(wrapper.find(Checkbox).at(0).prop("value")).toBe(1);
            expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(false);
            expect(wrapper.find(Checkbox).at(1).prop("value")).toBe(15);
            expect(wrapper.find(Checkbox).at(1).prop("checked")).toBe(false);
            
            wrapper.find(Button).at(1).simulate("click");
            wrapper.find(Checkbox).at(0).simulate("click");

            expect(wrapper.find(Checkbox).at(0).prop("value")).toBe(1);
            expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(false);
            expect(wrapper.find(Checkbox).at(1).prop("value")).toBe(15);
            expect(wrapper.find(Checkbox).at(1).prop("checked")).toBe(true);

            wrapper.find(Checkbox).at(0).simulate("click");

            expect(wrapper.find(Checkbox).at(0).prop("value")).toBe(1);
            expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(true);
            
            wrapper.find(Button).at(2).simulate("click");
        });
    });
    
    it("should click Edit Tweets", () => {
        const wrapper = mountWithStore(<UnsentTweetsModal visible={true} onClose={jest.fn()}/>, mockRootState);

        expect(wrapper.find(Button).at(0).text().includes("Edit")).toBe(true);
        expect(wrapper.find("#editListFooter").exists()).toBe(false);
        
        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(Button).at(0).text().includes("Done")).toBe(true);
        expect(wrapper.find("#editListFooter").exists()).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Select All")).toBe(true);
        expect(wrapper.find(Button).at(2).text().includes("Delete")).toBe(true);

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(Button).at(0).text().includes("Edit")).toBe(true);
        expect(wrapper.find("#editListFooter").exists()).toBe(false);
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<UnsentTweetsModal visible={true} onClose={jest.fn()}/>, mockRootState);

        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Edit")).toBe(true);
        expect(wrapper.find(Tab).at(0).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(0).text().includes("Scheduled")).toBe(true);
        expect(wrapper.find(Tab).at(1).prop("selected")).toBe(false);
        expect(wrapper.find(Tab).at(1).text().includes("Drafts")).toBe(true);
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<UnsentTweetsModal visible={false} onClose={jest.fn()}/>, mockRootState);
        
        expect(wrapper.find(UnsentTweetsModal).prop("visible")).toBe(false);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
    
    const testTabClick = (done: DoneCallback, tabIndex: number, tabText: string, emptyText: string): void => {
        const mock = new MockAdapter(axios);
        const wrapper = mountWithStore(<UnsentTweetsModal visible={true} onClose={jest.fn()}/>, mockRootState);

        mock.onGet(`${API_URL}/tweets/schedule`).reply(200, []);

        wrapper.find(Tab).at(tabIndex).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(Tab).at(tabIndex).prop("selected")).toBe(true);
            expect(wrapper.find(Tab).at(tabIndex).text().includes(tabText)).toBe(true);
            expect(wrapper.text().includes(emptyText)).toBe(true);
            expect(wrapper.text().includes("When you do, you’ll find them here.")).toBe(true);
        });
    };
});
