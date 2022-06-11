import React from "react";
import {IconButton, Paper} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import Poll from "../Poll";
import PollInput from "../PollInput/PollInput";
import {FilledSelect} from "../../../FilledSelect/FilledSelect";
import HoverAction from "../../../HoverAction/HoverAction";

describe("Poll", () => {

    it("should render correctly and click Add Poll Choice Button", () => {
        const {wrapper} = createPollWrapper();

        expect(wrapper.find(PollInput).at(0).prop("label")).toBe("Choice 1");
        expect(wrapper.find(PollInput).at(1).prop("label")).toBe("Choice 2");
        expect(wrapper.find(PollInput).at(2).exists()).toBeFalsy();
        expect(wrapper.find(PollInput).at(3).exists()).toBeFalsy();

        wrapper.find("#addPollChoiceButton").at(0).find(IconButton).simulate("click");

        expect(wrapper.find(PollInput).at(2).prop("label")).toBe("Choice 3 (optional)");
        expect(wrapper.find(PollInput).at(3).exists()).toBeFalsy();

        wrapper.find("#addPollChoiceButton").at(0).find(IconButton).simulate("click");

        expect(wrapper.find(PollInput).at(2).prop("label")).toBe("Choice 3 (optional)");
        expect(wrapper.find(PollInput).at(3).prop("label")).toBe("Choice 4 (optional)");
        expect(wrapper.find("#addPollChoiceButton").exists()).toBeFalsy();
        expect(wrapper.text().includes("Poll length")).toBe(true);
        expect(wrapper.text().includes("Days")).toBe(true);
        expect(wrapper.text().includes("Hours")).toBe(true);
        expect(wrapper.text().includes("Minutes")).toBe(true);
        expect(wrapper.text().includes("Remove poll")).toBe(true);
    });

    it("should change poll input and select date", () => {
        const {
            wrapper,
            mockSetDay,
            mockSetHour,
            mockSetMinute,
            mockSetChoice1,
            mockSetChoice2,
            mockSetChoice3,
            mockSetChoice4,
            mockOnClose
        } = createPollWrapper();

        wrapper.find("#addPollChoiceButton").at(0).find(IconButton).simulate("click");
        wrapper.find("#addPollChoiceButton").at(0).find(IconButton).simulate("click");
        wrapper.find(PollInput).at(0).find("input").at(0).simulate("change", {target: {value: "test poll 1"}});
        wrapper.find(PollInput).at(1).find("input").at(0).simulate("change", {target: {value: "test poll 2"}});
        wrapper.find(PollInput).at(2).find("input").at(0).simulate("change", {target: {value: "test poll 3"}});
        wrapper.find(PollInput).at(3).find("input").at(0).simulate("change", {target: {value: "test poll 4"}});
        wrapper.find(FilledSelect).at(0).find("select").simulate("change", {target: {value: 7}});
        wrapper.find(FilledSelect).at(1).find("select").simulate("change", {target: {value: 23}});
        wrapper.find(FilledSelect).at(2).find("select").simulate("change", {target: {value: 59}});

        expect(mockSetChoice1).toHaveBeenCalled();
        expect(mockSetChoice1).toHaveBeenCalledWith("test poll 1");
        expect(mockSetChoice2).toHaveBeenCalled();
        expect(mockSetChoice2).toHaveBeenCalledWith("test poll 2");
        expect(mockSetChoice3).toHaveBeenCalled();
        expect(mockSetChoice3).toHaveBeenCalledWith("test poll 3");
        expect(mockSetChoice4).toHaveBeenCalled();
        expect(mockSetChoice4).toHaveBeenCalledWith("test poll 4");
        expect(mockSetDay).toHaveBeenCalled();
        expect(mockSetDay).toHaveBeenCalledWith(7);
        expect(mockSetHour).toHaveBeenCalled();
        expect(mockSetHour).toHaveBeenCalledWith(23);
        expect(mockSetMinute).toHaveBeenCalled();
        expect(mockSetMinute).toHaveBeenCalledWith(59);

        wrapper.find("#removePoll").at(0).simulate("click");

        expect(mockOnClose).toHaveBeenCalled();
    });

    it("should hover Add icon and render Hover Action", () => {
        jest.useFakeTimers();
        const {wrapper} = createPollWrapper();
        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("Add");
        wrapper.find(IconButton).simulate("mouseleave");

        expect(wrapper.find(HoverAction).prop("visible")).toBe(false);
    });

    it("should Poll not exist", () => {
        const {wrapper} = createPollWrapper(false);
        expect(wrapper.find(Paper).exists()).toBeFalsy();
    });

    const createPollWrapper = (visiblePoll = true) => {
        const mockSetDay = jest.fn();
        const mockSetHour = jest.fn();
        const mockSetMinute = jest.fn();
        const mockSetChoice1 = jest.fn();
        const mockSetChoice2 = jest.fn();
        const mockSetChoice3 = jest.fn();
        const mockSetChoice4 = jest.fn();
        const mockOnClose = jest.fn();

        const wrapper = mountWithStore(
            <Poll
                choice1={""}
                choice2={""}
                choice3={""}
                choice4={""}
                setChoice1={mockSetChoice1}
                setChoice2={mockSetChoice2}
                setChoice3={mockSetChoice3}
                setChoice4={mockSetChoice4}
                day={1}
                hour={0}
                minute={0}
                setDay={mockSetDay}
                setHour={mockSetHour}
                setMinute={mockSetMinute}
                visiblePoll={visiblePoll}
                onClose={mockOnClose}
            />, createMockRootState(LoadingStatus.LOADED));

        return {
            wrapper,
            mockSetDay,
            mockSetHour,
            mockSetMinute,
            mockSetChoice1,
            mockSetChoice2,
            mockSetChoice3,
            mockSetChoice4,
            mockOnClose
        };
    };
});
