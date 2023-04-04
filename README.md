# Twitter clone

Twitter clone developed with a microservice approach using the Spring Framework and React.js. </br>
The project is always updated with new features. </br>
See more demo screenshots below.

![Home page](https://i.ibb.co/vBsQTZT/1-Preview.jpg)

## Used Technologies:

* Back-end: Java 17, Spring (Boot, Cloud, Data, Security), JPA / Hibernate, PostgreSQL, JUnit, Mockito
* Front-end: TypeScript, React.js, Redux-Saga, Material-UI, Jest, Enzyme
* Security: JWT
* AWS S3 bucket
* Docker

## Features

* Authentication with JWT and Email validation. Password change.
* Users can Add tweets, Like, Retweet, Reply, Quote tweets, Schedule tweets.
* Users can Delete tweets, Send tweet via Direct Message, Add tweet to Bookmarks.
* Users can Create Lists, Edit Lists, Add other users to Lists, Follow List, Pin Lists.
* Users get notifications when someone subscribed, retweet or liked tweet.
* Users can add Images to tweet, Create Poll and vote, Post tweets with link preview, Posts tweets with YouTube video link.
* Websocket online chats.
* Private user profile and lists.
* Account Settings.
* Users can subscribe to each other.
* User can edit profile.
* User can block and mute other users.
* Users can customize site color scheme and color background.
* Users can search tweets by hashtags and search other users and users tweets.
* All images downloads on Amazon S3 bucket.

## Work in progress

* Advanced search
* User mentions
* Tweet thread
* Front-end refactoring
* Back-end refactoring
* Adaptive layout

## Installation

1. Install maven: [link](https://www.baeldung.com/install-maven-on-windows-linux-mac)
2. Install Java: [link](https://www.oracle.com/java/technologies/javase/jdk15-archive-downloads.html)
3. Install Postgresql: [link](https://www.postgresql.org/download/)
4. Install Intellij IDEA Ultimate: [link](https://www.jetbrains.com/idea/)
5. Install Docker and Docker Desktop
6. Add Lombok plugin to the Intellij IDEA: [link](https://i.ibb.co/Gtwcw0t/6-lombok.jpg)
7. Make sure Java 17 is selected: [link](https://i.ibb.co/8PVGDdm/7-Java-17.png)
8. Build the project with Maven: [link](https://i.ibb.co/qr4w7F4/8-Maven-build.pngg)
9. In the docker-compose file [link](https://github.com/merikbest/twitter-spring-reactjs/blob/microservice/docker-compose.yml) run 4 services: `postgres`, `pgadmin`, `zipkin`, `rabbitmq` [link](https://i.ibb.co/tCCXJLk/9-Docker-Desktop.png)
10. Open http://localhost:5050/browser/ and create DBs: `user`, `tweet`, `chat`, `lists`, `notification`, `tag`, `topic`
11. Sign up for a new AWS account: [link](https://portal.aws.amazon.com/billing/signup#/start)
12. Create a new AWS S3 bucket: [link](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html)
13. Change access from private to public in the AWS S3 bucket
14. Add a public access policy to the AWS S3 bucket (!!!important!!! see:
[doc](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-policy-language-overview.html),
[github examle](https://stackoverflow.com/questions/58580042/how-to-set-public-read-only-access-on-amazon-s3-bucket#:~:text=To%20make%20objects%20publicly%20accessible%2C%20use%20a%20policy%20like%20this%3A) or 
[my example](https://i.ibb.co/mSpHmyL/12-bucket.jpg))
15. Get AWS keys: [link](https://supsystic.com/documentation/id-secret-access-key-amazon-s3/) and add to the application.properties file: [link](https://i.ibb.co/zHw537K/13-key.jpg)
16. In the [image-service.yml config file](https://github.com/merikbest/twitter-spring-reactjs/blob/391ddc666a79057615322898ea2715f1178fdb03/config-server/src/main/resources/config/image-service.yml#L13) add bucket, access-key, secret-key properties
17. Sign up for gmail
18. Create google API keys: [link](https://developers.google.com/youtube/v3/getting-started#before-you-start)
19. Add google API key to the [tweet-service.yml config file](https://github.com/merikbest/twitter-spring-reactjs/blob/391ddc666a79057615322898ea2715f1178fdb03/config-server/src/main/resources/config/tweet-service.yml#L27)
20. Add gmail account and password to the [email-service.yml config file](https://github.com/merikbest/twitter-spring-reactjs/blob/391ddc666a79057615322898ea2715f1178fdb03/config-server/src/main/resources/config/email-service.yml#L11)
21. Go to [link](https://myaccount.google.com/u/2/lesssecureapps) (important) and change to: “Allow less secure apps: ON”
22. Install node.js and npm: [link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
23. Open terminal in frontend directory and type: npm install (or yarn install)
24. Run services in this order:
    - eureka-server
    - config-server
    - api-gateway
    - user-service
    - and then all other services in any order [link](https://i.ibb.co/jRhYMd9/24-microservices-run.png)
25. Open terminal in frontend directory and type: npm start or run via [package.json](https://github.com/merikbest/twitter-spring-reactjs/blob/391ddc666a79057615322898ea2715f1178fdb03/frontend/package.json#L73)
26. Navigate to http://localhost:3000/home

#### To enter the application you can register or login:
Login: user2016@gmail.com  
Password: qwerty123

## Screenshots

#### Add tweet
![AddTweet](https://i.ibb.co/D51M0Q5/2-Add-tweet.jpg)
___
#### Add Poll
![AddTPoll](https://i.ibb.co/Dw8B0Qf/3-Add-Poll.jpg)
___
#### Reply tweet
![Reply](https://i.ibb.co/SR3qtMG/4-Reply-tweet.jpg)
___
#### Tweet image modal
![TweetImageModal](https://i.ibb.co/gZD9L6p/5-Tweet-image-modal.jpg)
___
#### Notifications
![Notifications](https://i.ibb.co/8Y8CLyj/6-Notifications.jpg)
___
#### Full Notifications
![FullNotifications](https://i.ibb.co/dKZjYCF/7-Full-Notifications.jpg)
___
#### Search
![Search](https://i.ibb.co/MCk2r0q/8-Search.jpg)
___
#### Search Videos
![SearchVideos](https://i.ibb.co/pnFN638/9-Search-Videos.jpg)
___
#### Full tweet
![FullTweet](https://i.ibb.co/SN5Z3bD/10-Full-tweet.jpg)
___
#### Liked by Modal window
![LikedByModalWindow](https://i.ibb.co/vYts3qF/11-Liked-by-Modal-window.jpg)
___
#### Following and Followers
![FollowingAndFollowers](https://i.ibb.co/BjMSzf3/12-Following-and-Followers.jpg)
___
#### Trends
![Trends](https://i.ibb.co/BfJPZ8G/13-Trends.jpg)
___
#### Bookmarks
![Bookmarks](https://i.ibb.co/crYxw7V/14-Bookmarks.jpg)
___
#### Chat
![Chat](https://i.ibb.co/PM6qZ8n/15-Chat.jpg)
___
#### Lists
![Lists](https://i.ibb.co/ftpCZj8/16-Lists.jpg)
___
#### Full List
![FullList](https://i.ibb.co/WVZrRX7/17-Full-List.jpg)
___
#### Suggested Lists
![SuggestedLists](https://i.ibb.co/rsrgqZn/18-Suggested-Lists.jpg)
___
#### Settings
![Settings](https://i.ibb.co/r3BRZnM/19-Settings.jpg)
___
#### Customization
![Customization](https://i.ibb.co/bsqWhmN/20-Profile-Customization.jpg)
___
#### Dark theme profile
![Customization](https://i.ibb.co/h1z1BCT/21-Profile-with-color-theme.jpg)
