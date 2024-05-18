export const HOST = "http://localhost:8000";
export const UI_V1 = `${HOST}/ui/v1`;
export const WS_URL = `${HOST}/websocket`;
export const UI_V1_IMAGE_UPLOAD = `${UI_V1}/image/upload`;

// user-service
export const UI_V1_USER = `${UI_V1}/user`;
export const UI_V1_AUTH = `${UI_V1}/auth`;
export const UI_V1_AUTH_LOGIN = `${UI_V1_AUTH}/login`;
export const UI_V1_AUTH_FORGOT_EMAIL = `${UI_V1_AUTH}/forgot/email`;
export const UI_V1_AUTH_FORGOT = `${UI_V1_AUTH}/forgot`;
export const UI_V1_AUTH_RESET = `${UI_V1_AUTH}/reset`;
export const UI_V1_AUTH_RESET_CODE = (code: string) => `${UI_V1_AUTH}/reset/${code}`;
export const UI_V1_AUTH_RESET_CURRENT = `${UI_V1_AUTH}/reset/current`;
export const UI_V1_AUTH_REGISTRATION_CHECK = `${UI_V1_AUTH}/registration/check`;
export const UI_V1_AUTH_REGISTRATION_CODE = `${UI_V1_AUTH}/registration/code`;
export const UI_V1_AUTH_REGISTRATION_ACTIVATE_CODE = (code: string) => `${UI_V1_AUTH}/registration/activate/${code}`;
export const UI_V1_AUTH_REGISTRATION_CONFIRM = `${UI_V1_AUTH}/registration/confirm`;
export const UI_V1_USER_BLOCKED = `${UI_V1_USER}/blocked`;
export const UI_V1_USER_BLOCKED_USER_ID = (userId: string | number) => `${UI_V1_USER}/blocked/${userId}`;
export const UI_V1_USER_FOLLOWERS_USER_ID = (userId: string | number) => `${UI_V1_USER}/followers/${userId}`;
export const UI_V1_USER_FOLLOWING_USER_ID = (userId: string | number) => `${UI_V1_USER}/following/${userId}`;
export const UI_V1_USER_FOLLOWER_REQUESTS = `${UI_V1_USER}/follower-requests`;
export const UI_V1_USER_FOLLOW_USER_ID = (userId: number) => `${UI_V1_USER}/follow/${userId}`;
export const UI_V1_USER_FOLLOW_OVERALL_USER_ID = (userId: string | number) => `${UI_V1_USER}/follow/overall/${userId}`;
export const UI_V1_USER_FOLLOW_PRIVATE_USER_ID = (userId: number) => `${UI_V1_USER}/follow/private/${userId}`;
export const UI_V1_USER_FOLLOW_ACCEPT_USER_ID = (userId: number) => `${UI_V1_USER}/follow/accept/${userId}`;
export const UI_V1_USER_FOLLOW_DECLINE_USER_ID = (userId: number) => `${UI_V1_USER}/follow/decline/${userId}`;
export const UI_V1_USER_MUTED = `${UI_V1_USER}/muted`;
export const UI_V1_USER_MUTED_USER_ID = (userId: number) => `${UI_V1_USER}/muted/${userId}`;
export const UI_V1_USER_TOKEN = `${UI_V1_USER}/token`;
export const UI_V1_USER_USER_ID = (userId: number) => `${UI_V1_USER}/${userId}`;
export const UI_V1_USER_ALL = `${UI_V1_USER}/all`;
export const UI_V1_USER_RELEVANT = `${UI_V1_USER}/relevant`;
export const UI_V1_USER_SEARCH_USERNAME = (username: string) => `${UI_V1_USER}/items/search/${username}`;
export const UI_V1_USER_SEARCH_TEXT = (text: string) => `${UI_V1_USER}/search/${text}`;
export const UI_V1_USER_SEARCH_RESULTS = `${UI_V1_USER}/search/results`;
export const UI_V1_USER_START = `${UI_V1_USER}/start`;
export const UI_V1_USER_SUBSCRIBE_USER_ID = (userId: number) => `${UI_V1_USER}/subscribe/${userId}`;
export const UI_V1_USER_PIN_TWEET_ID = (tweetId: number) => `${UI_V1_USER}/pin/tweet/${tweetId}`;
export const UI_V1_USER_DETAILS_USER_ID = (userId: number) => `${UI_V1_USER}/details/${userId}`;
export const UI_V1_USER_SETTINGS_UPDATE_USERNAME = `${UI_V1_USER}/settings/update/username`;
export const UI_V1_USER_SETTINGS_UPDATE_EMAIL = `${UI_V1_USER}/settings/update/email`;
export const UI_V1_USER_SETTINGS_UPDATE_PHONE = `${UI_V1_USER}/settings/update/phone`;
export const UI_V1_USER_SETTINGS_UPDATE_COUNTRY = `${UI_V1_USER}/settings/update/country`;
export const UI_V1_USER_SETTINGS_UPDATE_GENDER = `${UI_V1_USER}/settings/update/gender`;
export const UI_V1_USER_SETTINGS_UPDATE_LANGUAGE = `${UI_V1_USER}/settings/update/language`;
export const UI_V1_USER_SETTINGS_UPDATE_DIRECT = `${UI_V1_USER}/settings/update/direct`;
export const UI_V1_USER_SETTINGS_UPDATE_PRIVATE = `${UI_V1_USER}/settings/update/private`;
export const UI_V1_USER_SETTINGS_UPDATE_COLOR_SCHEME = `${UI_V1_USER}/settings/update/color_scheme`;
export const UI_V1_USER_SETTINGS_UPDATE_BACKGROUND_COLOR = `${UI_V1_USER}/settings/update/background_color`;

// tweets-service
export const UI_V1_TWEETS = `${UI_V1}/tweets`;
export const UI_V1_TWEETS_USER_BOOKMARKS = `${UI_V1_TWEETS}/user/bookmarks`;
export const UI_V1_TWEETS_USER_BOOKMARKS_TWEET_ID = (tweetId: number) => `${UI_V1_TWEETS}/user/bookmarks/${tweetId}`;
export const UI_V1_TWEETS_ID_BOOKMARKED = (tweetId: number) => `${UI_V1_TWEETS}/${tweetId}/bookmarked`;
export const UI_V1_TWEETS_LIKE = `${UI_V1_TWEETS}/like`;
export const UI_V1_TWEETS_LIKED_USER_ID = (userId: string | number) => `${UI_V1_TWEETS}/liked/user/${userId}`;
export const UI_V1_TWEETS_ID_LIKED_USERS = (tweetId: number) => `${UI_V1_TWEETS}/${tweetId}/liked-users`;
export const UI_V1_TWEETS_POOL = `${UI_V1_TWEETS}/poll`;
export const UI_V1_TWEETS_VOTE = `${UI_V1_TWEETS}/vote`;
export const UI_V1_TWEETS_USER_REPLIES = (userId: string | number) => `${UI_V1_TWEETS}/replies/user/${userId}`;
export const UI_V1_TWEETS_ID_RETWEETED_USERS = (tweetId: number) => `${UI_V1_TWEETS}/${tweetId}/retweeted-users`;
export const UI_V1_TWEETS_RETWEET = `${UI_V1_TWEETS}/retweet`;
export const UI_V1_TWEETS_SCHEDULE = `${UI_V1_TWEETS}/schedule`;
export const UI_V1_TWEETS_ID = (tweetId: number) => `${UI_V1}/tweets/${tweetId}`;
export const UI_V1_TWEETS_USER_ID = (userId: string | number) => `${UI_V1_TWEETS}/user/${userId}`;
export const UI_V1_TWEETS_MEDIA_USER_ID = (userId: string | number) => `${UI_V1_TWEETS}/media/user/${userId}`;
export const UI_V1_TWEETS_IMAGES_USER_ID = (userId: number) => `${UI_V1_TWEETS}/images/${userId}`;
export const UI_V1_TWEETS_ID_INFO = (tweetId: number) => `${UI_V1_TWEETS}/${tweetId}/info`;
export const UI_V1_TWEETS_ID_REPLIES = (tweetId: number) => `${UI_V1_TWEETS}/${tweetId}/replies`;
export const UI_V1_TWEETS_ID_QUOTES = (tweetId: number) => `${UI_V1_TWEETS}/${tweetId}/quotes`;
export const UI_V1_TWEETS_MEDIA = `${UI_V1_TWEETS}/media`;
export const UI_V1_TWEETS_VIDEO = `${UI_V1_TWEETS}/video`;
export const UI_V1_TWEETS_FOLLOWER = `${UI_V1_TWEETS}/follower`;
export const UI_V1_TWEETS_UPLOAD = `${UI_V1_TWEETS}/upload`;
export const UI_V1_TWEETS_IMAGE_TAGGED = `${UI_V1_TWEETS}/image/tagged`;
export const UI_V1_TWEETS_SEARCH_TEXT = (text: string) => `${UI_V1_TWEETS}/search/${text}`;
export const UI_V1_TWEETS_REPLY = `${UI_V1_TWEETS}/reply`;
export const UI_V1_TWEETS_QUOTE = `${UI_V1_TWEETS}/quote`;
export const UI_V1_TWEETS_CHANGE_REPLY = `${UI_V1_TWEETS}/reply/change`;

// chat-service
export const UI_V1_CHAT = `${UI_V1}/chat`;
export const UI_V1_CHAT_CHAT_ID = (chatId: number) => `${UI_V1_CHAT}/${chatId}`;
export const UI_V1_CHAT_USERS = `${UI_V1_CHAT}/users`;
export const UI_V1_CHAT_CREATE_USER_ID = (chatId: number) => `${UI_V1_CHAT}/create/${chatId}`;
export const UI_V1_CHAT_ID_MESSAGES = (chatId: number) => `${UI_V1_CHAT}/${chatId}/messages`;
export const UI_V1_CHAT_ID_READ_MESSAGES = (chatId: number) => `${UI_V1_CHAT}/${chatId}/read/messages`;
export const UI_V1_CHAT_ADD_MESSAGE = `${UI_V1_CHAT}/add/message`;
export const UI_V1_CHAT_ADD_MESSAGE_TWEET = `${UI_V1_CHAT}/add/message/tweet`;
export const UI_V1_CHAT_PARTICIPANT = `${UI_V1_CHAT}/participant`;
export const UI_V1_CHAT_LEAVE = `${UI_V1_CHAT}/leave`;
export const UI_V1_CHAT_SEARCH = `${UI_V1_CHAT}/items/search`;

// lists-service
export const UI_V1_LISTS = `${UI_V1}/lists`;
export const UI_V1_LISTS_ID = (listId: number) => `${UI_V1_LISTS}/${listId}`
export const UI_V1_LISTS_USER = `${UI_V1_LISTS}/user`;
export const UI_V1_LISTS_USER_ID = (userId: number) => `${UI_V1_LISTS}/user/${userId}`;
export const UI_V1_LISTS_USER_CONSIST = `${UI_V1_LISTS}/user/consist`;
export const UI_V1_LISTS_PINNED = `${UI_V1_LISTS}/pined`;
export const UI_V1_LISTS_FOLLOW = (listId: number) => `${UI_V1_LISTS}/follow/${listId}`;
export const UI_V1_LISTS_PIN = (listId: number) => `${UI_V1_LISTS}/pin/${listId}`;
export const UI_V1_LISTS_ADD_USER = `${UI_V1_LISTS}/add/user`;
export const UI_V1_LISTS_TWEETS = (listId: number) => `${UI_V1_LISTS}/${listId}/tweets`;
export const UI_V1_LISTS_DETAILS = (listId: number) => `${UI_V1_LISTS}/${listId}/details`;
export const UI_V1_LISTS_FOLLOWERS = (listId: number, listOwnerId: number) => `${UI_V1_LISTS}/${listId}/${listOwnerId}/followers`;
export const UI_V1_LISTS_MEMBERS = (listId: number, listOwnerId: number) => `${UI_V1_LISTS}/${listId}/${listOwnerId}/members`;
export const UI_V1_LISTS_SEARCH = `${UI_V1_LISTS}/search`;

// tag-service
export const UI_V1_TAGS = `${UI_V1}/tags`;
export const UI_V1_TAGS_TRENDS = `${UI_V1_TAGS}/trends`;
export const UI_V1_TAGS_SEARCH = `${UI_V1_TAGS}/search`;

// topic-service
export const UI_V1_TOPICS = `${UI_V1}/topics`;
export const UI_V1_TOPICS_SUGGESTED = `${UI_V1_TOPICS}/suggested`;
export const UI_V1_TOPICS_CATEGORY = `${UI_V1_TOPICS}/category`;
export const UI_V1_TOPICS_FOLLOWED = `${UI_V1_TOPICS}/followed`;
export const UI_V1_TOPICS_FOLLOWED_ID = (userId: number) => `${UI_V1_TOPICS}/followed/${userId}`;
export const UI_V1_TOPICS_NOT_INTERESTED = `${UI_V1_TOPICS}/not_interested`;
export const UI_V1_TOPICS_NOT_INTERESTED_TOPIC_ID = (topicId: number) => `${UI_V1_TOPICS}/not_interested/${topicId}`;
export const UI_V1_TOPICS_FOLLOW_TOPIC_ID = (topicId: number) => `${UI_V1_TOPICS}/follow/${topicId}`;

// notification-service
export const UI_V1_NOTIFICATION = `${UI_V1}/notification`;
export const UI_V1_NOTIFICATION_USER = `${UI_V1_NOTIFICATION}/user`;
export const UI_V1_NOTIFICATION_MENTIONS = `${UI_V1_NOTIFICATION}/mentions`;
export const UI_V1_NOTIFICATION_SUBSCRIBES = `${UI_V1_NOTIFICATION}/subscribes`;
export const UI_V1_NOTIFICATION_TIMELINE = `${UI_V1_NOTIFICATION}/timeline`;
