export const TOPIC = "/topic";
export const TOPIC_FEED = TOPIC + "/feed";
export const TOPIC_FEED_ADD = TOPIC_FEED + "/add";
export const TOPIC_FEED_SCHEDULE = TOPIC_FEED + "/schedule";
export const TOPIC_CHAT = (myProfileId: number) => `${TOPIC}/chat/${myProfileId}`;
export const TOPIC_NOTIFICATIONS = (myProfileId: number) => `${TOPIC}/notifications/${myProfileId}`;
export const TOPIC_TWEET = (tweetId: number | string) => `${TOPIC}/tweet/${tweetId}`;
export const TOPIC_USER_ADD_TWEET = (userId: number | string) => `${TOPIC}/user/add/tweet/${userId}`;
export const TOPIC_USER_UPDATE_TWEET = (userId: number | string) => `${TOPIC}/user/update/tweet/${userId}`;
