import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { LoadingStatus } from "../../../types/common";
import { AddTweetFormTypes, FetchGifsActionInterface } from "./constants/actionTypes";
import { setGifs, setLoadingGifsState } from "./actionCreators";
import { GiphyDataProps } from "../../../types/tweet";
import { axios } from "../../../core/axios";
import { GIPHY_API_URL } from "../../../constants/url-constants";

const searchGif = async (text: string): Promise<AxiosResponse<GiphyDataProps[]>> => {
    return await axios.get<GiphyDataProps[]>(`${GIPHY_API_URL}${text}`);
};

export function* fetchGifsRequest({ payload }: FetchGifsActionInterface) {
    try {
        yield put(setLoadingGifsState(LoadingStatus.LOADING));
        const response: AxiosResponse<{ data: GiphyDataProps[] }> = yield call(searchGif, payload);
        yield put(setGifs(response.data.data));
        yield put(setLoadingGifsState(LoadingStatus.LOADED));
    } catch (error) {
        yield put(setLoadingGifsState(LoadingStatus.ERROR));
    }
}

export function* addTweetFormSaga() {
    yield takeLatest(AddTweetFormTypes.FETCH_GIFS, fetchGifsRequest);
}
