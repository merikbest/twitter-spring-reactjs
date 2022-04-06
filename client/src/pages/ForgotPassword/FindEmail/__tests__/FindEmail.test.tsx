import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {Button} from "@material-ui/core";
import FindEmail from "../FindEmail";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {API_URL} from "../../../../util/url";
import {createMemoryHistory} from "history";
import {ForgotPasswordTextField} from "../../ForgotPasswordTextField/ForgotPasswordTextField";

describe("FindEmail", () => {
    const mockEmail = "test@test.com";
    const mockStore = createMockRootState();

    it("should render correctly", () => {
        const wrapper = mountWithStore(<FindEmail/>, mockStore);

        expect(wrapper.text().includes("Find your Twitter account")).toBe(true);
        expect(wrapper.text().includes("Enter your email, phone number, or username.")).toBe(true);
        expect(wrapper.find(Button).at(0).text()).toEqual("Search");
    });

    it("should email exist", (done) => {
        const mock = new MockAdapter(axios);
        mock.onPost(`${API_URL}/auth/forgot/email`, {email: mockEmail}).reply(200);
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<FindEmail/>, createMockRootState(), history);
        const input = wrapper.find(ForgotPasswordTextField).find("input").at(0);

        input.simulate("change", {target: {value: mockEmail}});
        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(pushSpy).toHaveBeenCalled();
            expect(pushSpy).toHaveBeenCalledWith({pathname: "/account/forgot/send_password_reset", state: {email: mockEmail}});
        });
    });

    it("should email not exist", (done) => {
        const mock = new MockAdapter(axios);
        mock.onPost(`${API_URL}/auth/forgot/email`, {email: mockEmail}).reply(400);
        const wrapper = mountWithStore(<FindEmail/>, createMockRootState());
        const input = wrapper.find(ForgotPasswordTextField).find("input").at(0);

        input.simulate("change", {target: {value: mockEmail}});
        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.text().includes("We couldn't find your account with that information")).toBe(true);
            expect(wrapper.text().includes("Please try searching for your email, phone number or username again.")).toBe(true);
        });
    });
});
