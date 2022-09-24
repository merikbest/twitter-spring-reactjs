import {AxiosResponse} from "axios";
import MockAdapter from "axios-mock-adapter";

export const testApiCall = (
    mockAdapter: MockAdapter,
    method: "get" | "post" | "put" | "delete",
    expectedUrl: string,
    statusCode: number,
    expectedData: any,
    apiCall: (request?: any) => Promise<AxiosResponse<any>>,
    requestArgs?: any
): void => {
    let requestHandler;

    if (method === "get") {
        requestHandler = mockAdapter.onGet(expectedUrl);
    } else {
        requestHandler = mockAdapter.onPost(expectedUrl, requestArgs);
    }
    requestHandler.reply(statusCode, expectedData);

    if (statusCode > 200) {
        apiCall(requestArgs).then((response) => response)
            .catch((error) => {
                testExpectResponse(error.response, statusCode, expectedUrl, expectedData);
            });
    } else {
        apiCall(requestArgs).then((response) => {
            testExpectResponse(response, statusCode, expectedUrl, expectedData);
        });
    }
};

const testExpectResponse = (response: AxiosResponse, statusCode: number, expectedUrl: string, expectedData: any): void => {
    expect(response.status).toEqual(statusCode);
    expect(response.config.url).toEqual(expectedUrl);
    expect(response.data).toEqual(expectedData);
};
