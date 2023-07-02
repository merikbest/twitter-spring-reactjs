export const HOST = "http://localhost:8000";
export const API_ENDPOINT = HOST + "/ui/v1";
export const WS_URL = HOST + "/websocket";

// AuthApi
export const API_AUTH_LOGIN = `${API_ENDPOINT}/auth/login`;
export const API_AUTH_REGISTRATION_CHECK = `${API_ENDPOINT}/auth/registration/check`;
export const API_AUTH_REGISTRATION_CODE = `${API_ENDPOINT}/auth/registration/code`;
export const API_AUTH_REGISTRATION_ACTIVATE = `${API_ENDPOINT}/auth/registration/activate`;
export const API_AUTH_REGISTRATION_CONFIRM = `${API_ENDPOINT}/auth/registration/confirm`;
export const API_AUTH_FORGOT_EMAIL = `${API_ENDPOINT}/auth/forgot/email`;
export const API_AUTH_FORGOT = `${API_ENDPOINT}/auth/forgot`;
export const API_AUTH_RESET = `${API_ENDPOINT}/auth/reset`;
export const API_AUTH_RESET_CURRENT = `${API_ENDPOINT}/auth/reset/current`;

// ChatApi
export const API_CHAT = `${API_ENDPOINT}/chat`;
export const API_CHAT_USERS = `${API_ENDPOINT}/chat/users`;
export const API_CHAT_CREATE = `${API_ENDPOINT}/chat/create`;
export const API_CHAT_MESSAGES = (chatId: number) => `${API_ENDPOINT}/chat/${chatId}/messages`;
export const API_CHAT_READ_MESSAGES = (chatId: number) => `${API_ENDPOINT}/chat/${chatId}/read/messages`;
export const API_CHAT_ADD_MESSAGE = `${API_ENDPOINT}/chat/add/message`;
export const API_CHAT_ADD_MESSAGE_TWEET = `${API_ENDPOINT}/chat/add/message/tweet`;
export const API_CHAT_PARTICIPANT = `${API_ENDPOINT}/chat/participant`;
export const API_CHAT_LEAVE = `${API_ENDPOINT}/chat/leave`;
export const API_CHAT_SEARCH = `${API_ENDPOINT}/chat/items/search`;

// ListsApi
export const API_LISTS = `${API_ENDPOINT}/lists`;
export const API_LISTS_USER = `${API_ENDPOINT}/lists/user`;
export const API_LISTS_USER_CONSIST = `${API_ENDPOINT}/lists/user/consist`;
export const API_LISTS_PINNED = `${API_ENDPOINT}/lists/pined`;
export const API_LISTS_FOLLOW = `${API_ENDPOINT}/lists/follow`;
export const API_LISTS_PIN = `${API_ENDPOINT}/lists/pin`;
export const API_LISTS_ADD_USER = `${API_ENDPOINT}/lists/add/user`;
export const API_LISTS_TWEETS = (listId: number) => `${API_ENDPOINT}/lists/${listId}/tweets`;
export const API_LISTS_DETAILS = (listId: number) => `${API_ENDPOINT}/lists/${listId}/details`;
export const API_LISTS_FOLLOWERS = (listId: number, listOwnerId: number) => `${API_ENDPOINT}/lists/${listId}/${listOwnerId}/followers`;
export const API_LISTS_MEMBERS = (listId: number, listOwnerId: number) => `${API_ENDPOINT}/lists/${listId}/${listOwnerId}/members`;
export const API_LISTS_SEARCH = `${API_ENDPOINT}/lists/search`;

// TagApi
export const API_TAGS = `${API_ENDPOINT}/tags`;
export const API_TAGS_TRENDS = `${API_ENDPOINT}/tags/trends`;
export const API_TAGS_SEARCH = `${API_ENDPOINT}/tags/search`;

// TopicApi
export const API_TOPICS = `${API_ENDPOINT}/topics`;
export const API_TOPICS_SUGGESTED = `${API_ENDPOINT}/topics/suggested`;
export const API_TOPICS_CATEGORY = `${API_ENDPOINT}/topics/category`;
export const API_TOPICS_FOLLOWED = `${API_ENDPOINT}/topics/followed`;
export const API_TOPICS_NOT_INTERESTED = `${API_ENDPOINT}/topics/not_interested`;
export const API_TOPICS_FOLLOW = `${API_ENDPOINT}/topics/follow`;

// TweetApi
export const API_TWEETS = `${API_ENDPOINT}/tweets`;
export const API_TWEETS_MEDIA = `${API_ENDPOINT}/tweets/media`;
export const API_TWEETS_VIDEO = `${API_ENDPOINT}/tweets/video`;
export const API_TWEETS_FOLLOWER = `${API_ENDPOINT}/tweets/follower`;
export const API_TWEETS_SCHEDULE = `${API_ENDPOINT}/tweets/schedule`;
export const API_TWEETS_INFO = (tweetId: number) => `${API_ENDPOINT}/tweets/${tweetId}/info`;
export const API_TWEETS_REPLIES = (tweetId: number) => `${API_ENDPOINT}/tweets/${tweetId}/replies`;
export const API_TWEETS_QUOTES = (tweetId: number) => `${API_ENDPOINT}/tweets/${tweetId}/quotes`;
export const API_TWEETS_LIKED_USERS = (tweetId: number) => `${API_ENDPOINT}/tweets/${tweetId}/liked-users`;
export const API_TWEETS_RETWEETED_USERS = (tweetId: number) => `${API_ENDPOINT}/tweets/${tweetId}/retweeted-users`;
export const API_TWEETS_BOOKMARKED = (tweetId: number) => `${API_ENDPOINT}/tweets/${tweetId}/bookmarked`;
export const API_TWEETS_IMAGE_TAGGED = `${API_ENDPOINT}/tweets/image/tagged`;
export const API_TWEETS_POOL = `${API_ENDPOINT}/tweets/poll`;
export const API_TWEETS_SEARCH = `${API_ENDPOINT}/tweets/search`;
export const API_TWEETS_LIKE = `${API_ENDPOINT}/tweets/like`;
export const API_TWEETS_RETWEET = `${API_ENDPOINT}/tweets/retweet`;
export const API_TWEETS_REPLY = `${API_ENDPOINT}/tweets/reply`;
export const API_TWEETS_QUOTE = `${API_ENDPOINT}/tweets/quote`;
export const API_TWEETS_CHANGE_REPLY = `${API_ENDPOINT}/tweets/reply/change`;
export const API_TWEETS_VOTE = `${API_ENDPOINT}/tweets/vote`;
export const API_TWEETS_USER_BOOKMARKS = `${API_ENDPOINT}/tweets/user/bookmarks`;
export const API_TWEETS_USER_LIKED = (userId: string | number) => `${API_ENDPOINT}/tweets/liked/user/${userId}`;
export const API_TWEETS_USER_REPLIES = (userId: string | number) => `${API_ENDPOINT}/tweets/replies/user/${userId}`;
export const API_TWEETS_USER_MEDIA = (userId: string | number) => `${API_ENDPOINT}/tweets/media/user/${userId}`;
export const API_TWEETS_USER_TWEETS = (userId: string | number) => `${API_ENDPOINT}/tweets/user/${userId}`;
export const API_TWEETS_IMAGES = `${API_ENDPOINT}/tweets/images`;
export const API_TWEETS_UPLOAD = `${API_ENDPOINT}/tweets/upload`;

// UserApi
export const API_USER = `${API_ENDPOINT}/user`;
export const API_USER_ALL = `${API_ENDPOINT}/user/all`;
export const API_USER_RELEVANT = `${API_ENDPOINT}/user/relevant`;
export const API_USER_SEARCH_USERNAME = `${API_ENDPOINT}/user/items/search`;
export const API_USER_SEARCH_TEXT = `${API_ENDPOINT}/user/search`;
export const API_USER_SEARCH_RESULTS = `${API_ENDPOINT}/user/search/results`;
export const API_USER_UPLOAD_IMAGE = `${API_ENDPOINT}/user/upload`;
export const API_USER_FOLLOWERS = `${API_ENDPOINT}/user/followers`;
export const API_USER_FOLLOWING = `${API_ENDPOINT}/user/following`;
export const API_USER_FOLLOWER_REQUESTS = `${API_ENDPOINT}/user/follower-requests`;
export const API_USER_FOLLOW = `${API_ENDPOINT}/user/follow`;
export const API_USER_FOLLOW_OVERALL = `${API_ENDPOINT}/user/follow/overall`;
export const API_USER_FOLLOW_PRIVATE = `${API_ENDPOINT}/user/follow/private`;
export const API_USER_FOLLOW_ACCEPT = `${API_ENDPOINT}/user/follow/accept`;
export const API_USER_FOLLOW_DECLINE = `${API_ENDPOINT}/user/follow/decline`;
export const API_USER_SUBSCRIBE = `${API_ENDPOINT}/user/subscribe`;
export const API_NOTIFICATION = `${API_ENDPOINT}/notification`;
export const API_NOTIFICATION_USER = `${API_ENDPOINT}/notification/user`;
export const API_NOTIFICATION_MENTIONS = `${API_ENDPOINT}/notification/mentions`;
export const API_NOTIFICATION_SUBSCRIBES = `${API_ENDPOINT}/notification/subscribes`;
export const API_NOTIFICATION_TIMELINE = `${API_ENDPOINT}/notification/timeline`;
export const API_USER_START = `${API_ENDPOINT}/user/start`;
export const API_USER_PIN_TWEET = `${API_ENDPOINT}/user/pin/tweet`;
export const API_USER_BLOCKED = `${API_ENDPOINT}/user/blocked`;
export const API_USER_MUTED = `${API_ENDPOINT}/user/muted`;
export const API_USER_DETAILS = `${API_ENDPOINT}/user/details`;
export const API_USER_TOKEN = `${API_ENDPOINT}/user/token`;

// UserSettingsApi
export const API_SETTINGS_UPDATE_USERNAME = `${API_ENDPOINT}/settings/update/username`;
export const API_SETTINGS_UPDATE_EMAIL = `${API_ENDPOINT}/settings/update/email`;
export const API_SETTINGS_UPDATE_PHONE = `${API_ENDPOINT}/settings/update/phone`;
export const API_SETTINGS_UPDATE_COUNTRY = `${API_ENDPOINT}/settings/update/country`;
export const API_SETTINGS_UPDATE_GENDER = `${API_ENDPOINT}/settings/update/gender`;
export const API_SETTINGS_UPDATE_LANGUAGE = `${API_ENDPOINT}/settings/update/language`;
export const API_SETTINGS_UPDATE_DIRECT = `${API_ENDPOINT}/settings/update/direct`;
export const API_SETTINGS_UPDATE_PRIVATE = `${API_ENDPOINT}/settings/update/private`;
export const API_SETTINGS_UPDATE_COLOR_SCHEME = `${API_ENDPOINT}/settings/update/color_scheme`;
export const API_SETTINGS_UPDATE_BACKGROUND_COLOR = `${API_ENDPOINT}/settings/update/background_color`;
