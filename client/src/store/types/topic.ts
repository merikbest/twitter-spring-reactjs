export interface TopicResponse {
    id: number;
    topicName: string;
    topicCategory: TopicCategory;
    isTopicFollowed: boolean;
    isTopicNotInterested: boolean;
}

export enum TopicCategory {
    FASHION_AND_BEAUTY = "FASHION_AND_BEAUTY",
    OUTDOORS = "OUTDOORS",
    ARTS_AND_CULTURE = "ARTS_AND_CULTURE",
    ANIMATION_AND_COMICS = "ANIMATION_AND_COMICS",
    BUSINESS_AND_FINANCE = "BUSINESS_AND_FINANCE",
    FOOD = "FOOD",
    TRAVEL = "TRAVEL",
    ENTERTAINMENT = "ENTERTAINMENT",
    MUSIC = "MUSIC",
    GAMING = "GAMING",
    CAREERS = "CAREERS",
    SPORTS = "SPORTS",
    ONLY_ON_TWITTER = "ONLY_ON_TWITTER"
}