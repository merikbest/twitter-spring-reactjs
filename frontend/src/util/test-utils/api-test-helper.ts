import { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";

export const testApiCall = (
    mockAdapter: MockAdapter,
    method: "onGet" | "onPost" | "onPut" | "onDelete",
    expectedUrl: string,
    statusCode: 200 | 400 | 403 | 404,
    expectedData: any,
    apiCall: (...request: any) => Promise<AxiosResponse<any>>,
    ...requestArgs: any[]
): void => {
    mockAdapter[method](expectedUrl, requestArgs instanceof Object ? requestArgs[0] : requestArgs).reply(statusCode, expectedData);

    if (statusCode > 200) {
        apiCall(...requestArgs)
            .then((response) => response)
            .catch((error) => {
                testExpectResponse(error.response, statusCode, expectedUrl, expectedData);
            });
    } else {
        apiCall(...requestArgs)
            .then((response) => {
                testExpectResponse(response, statusCode, expectedUrl, expectedData);
            });
    }
};

const testExpectResponse = (response: AxiosResponse, statusCode: number, expectedUrl: string, expectedData: any): void => {
    expect(response.status).toEqual(statusCode);
    expect(response.config.url).toEqual(expectedUrl);
    expect(response.data).toEqual(expectedData);
};
