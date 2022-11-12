import React from "react";
import { TextEncoder, TextDecoder } from "util"
import Adapter from "enzyme-adapter-react-16";
import {configure} from "enzyme";
configure({ adapter: new Adapter() });

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
});
