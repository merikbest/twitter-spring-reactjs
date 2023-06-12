import { addTweetFormReducer, initialAddTweetFormState, pollInitialState } from "../reducer";
import { AddTweetFormActions, AddTweetFormTypes } from "../constants/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { mockGiphyData, mockUsers } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus, ReplyType } from "../../../../types/common";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";

describe("addTweetFormReducer:", () => {

    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(addTweetFormReducer(undefined, {} as AddTweetFormActions)).toEqual(initialAddTweetFormState);
        });
    });

    describe("addTweetForm handlers:", () => {

        testActionDispatch(
            AddTweetFormTypes.SET_OPEN_POLL,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.SET_OPEN_POLL
            }),
            {
                ...initialAddTweetFormState,
                visiblePoll: true
            }
        );

        testActionDispatch(
            AddTweetFormTypes.SET_CLOSE_POLL,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.SET_CLOSE_POLL
            }),
            {
                ...initialAddTweetFormState,
                visiblePoll: false
            }
        );

        testActionDispatch(
            AddTweetFormTypes.SET_POLL_VALUE,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.SET_POLL_VALUE,
                payload: pollInitialState
            }),
            {
                ...initialAddTweetFormState,
                pollData: pollInitialState
            }
        );

        testActionDispatch(
            AddTweetFormTypes.SET_GIF,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.SET_GIF,
                payload: mockGiphyData[0]
            }),
            {
                ...initialAddTweetFormState,
                gif: mockGiphyData[0]
            }
        );

        testActionDispatch(
            AddTweetFormTypes.REMOVE_GIF,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.REMOVE_GIF
            }),
            {
                ...initialAddTweetFormState,
                gif: null
            }
        );

        testActionDispatch(
            AddTweetFormTypes.SET_SCHEDULE_DATE,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.SET_SCHEDULE_DATE,
                payload: new Date()
            }),
            {
                ...initialAddTweetFormState,
                scheduledDate: new Date()
            }
        );

        testActionDispatch(
            AddTweetFormTypes.CLEAR_SCHEDULE_DATE,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.CLEAR_SCHEDULE_DATE
            }),
            {
                ...initialAddTweetFormState,
                scheduledDate: null
            }
        );

        testActionDispatch(
            AddTweetFormTypes.SET_REPLY_TYPE,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.SET_REPLY_TYPE,
                payload: ReplyType.MENTION
            }),
            {
                ...initialAddTweetFormState,
                replyType: ReplyType.MENTION
            }
        );

        testActionDispatch(
            AddTweetFormTypes.SET_IMAGE_DESCRIPTION,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.SET_IMAGE_DESCRIPTION,
                payload: "test_image"
            }),
            {
                ...initialAddTweetFormState,
                imageDescription: "test_image"
            }
        );

        testActionDispatch(
            AddTweetFormTypes.SET_IMAGES,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.SET_IMAGES,
                payload: [{ src: "test" }] as ImageObj[]
            }),
            {
                ...initialAddTweetFormState,
                images: [{ src: "test" }] as ImageObj[]
            }
        );

        testActionDispatch(
            AddTweetFormTypes.REMOVE_IMAGES,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.REMOVE_IMAGES
            }),
            {
                ...initialAddTweetFormState,
                images: [],
                imageDescription: "",
                selectedUsers: []
            }
        );

        testActionDispatch(
            AddTweetFormTypes.SET_SELECTED_USER,
            addTweetFormReducer({ ...initialAddTweetFormState, selectedUsers: mockUsers }, {
                type: AddTweetFormTypes.SET_SELECTED_USER,
                payload: mockUsers[0]
            }),
            {
                ...initialAddTweetFormState,
                selectedUsers: [mockUsers[1]]
            }
        );

        testActionDispatch(
            AddTweetFormTypes.REMOVE_SELECTED_USER,
            addTweetFormReducer({ ...initialAddTweetFormState, selectedUsers: mockUsers }, {
                type: AddTweetFormTypes.REMOVE_SELECTED_USER,
                payload: mockUsers[0]
            }),
            {
                ...initialAddTweetFormState,
                selectedUsers: [mockUsers[1]]
            }
        );

        testActionDispatch(
            AddTweetFormTypes.RESET_ADD_TWEET_FORM_STATE,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.RESET_ADD_TWEET_FORM_STATE
            }),
            {
                ...initialAddTweetFormState,
                visiblePoll: false,
                pollData: pollInitialState,
                gif: null
            }
        );

        testActionDispatch(
            AddTweetFormTypes.RESET_GIFS,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.RESET_GIFS
            }),
            {
                ...initialAddTweetFormState,
                gifs: [],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            AddTweetFormTypes.SET_LOADING_STATE,
            addTweetFormReducer(initialAddTweetFormState, {
                type: AddTweetFormTypes.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialAddTweetFormState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
