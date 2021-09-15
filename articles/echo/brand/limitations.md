### Direct Messages Limitation
The database structure used for posts, comments, replies, likes which allowed for millions of each will not be ported to direct messages. This is due to the extremely frequent reads and writes send to the database in a given conversation. Thus, on average, only ~700 messages of average length can be supported at once. This means that once a chat history has surpassed ~700 messages, deletion is required. We will manage such deletion automatically likely in batches of 100 for sufficient padding. 

### Timeline Limitation
As the database structure is Cloud Firestore, it is difficult to create a proper follow / timeline system. As such, as a user followers another user, each active post is copied directly to the first user's timeline. As possibly hundreds to thousands of posts will be copied at once, it only takes the recent ~50 as to avoid exponential costs. 

### DM Timestamps Limitation
As it stands, each message is an object in an array in a Cloud Firestore document. Due to the way firestore works at the moment, there is no way to include timestamps in arrays. Since potentially unlimited messages could be sent, there is no feasible and straightforward format to allow for this.
