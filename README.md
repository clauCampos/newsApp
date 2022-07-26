## 📝 PROJECT COLLABORATIVES NEWS

### Description:

API that allows managing collective news.

When a new user is created, a registration code is created as well. Users will receive by email a link to activate the account, the user will receive a message indicating that the user has been activated.

To delete an account, the user must be logged in. A message will return indicating that the user has been successfully updated. 

Users can view a list with the latest news of the day, news from previous days, filter news by fixed thematic categories and register as a user. Registered users can also edit and delete news published by the user, vote positively or negatively (coming soon).

## Endpoints 💻

_In the DOCS folder you have a json ready to use in Postman with all the configured endpoints.Also I leave them here:_

### USERS 👤

> **Create a new user.** `POST: http://localhost:4000/api/v1/user/signin`
>
> ```
> Example for adding to body:
>
> {
> "nick_name": "user test'",
> "email": "test@gmail.com" ,
> "password": "prueba",
> "bio" : null,
> "avatar": null
> }
> ```

> **Login as user.**  `POST: http://localhost:4000/api/v1/user/login`
>
> ```
> Example for adding to body:
>
> {
> "email": "maria@gmail.com",
> "password": "Maria123"
> }
> ```

> **User's Registration.**  `GET: http://localhost:4000/api/v1/user/registration`
> ```
> Example for adding to body:
>
> {
> "nick_name": "mariat";
> "email": "maria@gmail.com",
> "password": "maria123"
> }
> ```

> **User's Activation.**  `GET: http://localhost:4000/api/v1/user/activate/:registrationCode`
>
> ```
> Example of the email received:
>
> ¡Welcome to COLLECTIVE NEWS PROJECT!
> to: mariat <maria@gmail.com>
> Activate your account here: 
> 'Activate'

> **Delete an user.**  `GET: http://localhost:4000/api/v1/user/:userID`
>
> ```
> Example for adding to body
>
> {
> "nick_name": "mariat";
> "email": "maria@gmail.com",
> "password": "Maria123"
> }
> ```

### POSTS 💬

> **Retrieve all posts.** `GET: http://localhost:4000/api/v1/posts/allPosts`

> **Retrieve last day posts sorted by total votes.** `GET: http://localhost:4000/api/v1/posts/get/latestPosts`

> **Retrieve all posts categorized with a specific topic.** `GET: http://localhost:4000/api/v1/posts/:topic`
>
> \*_current topics are: sports, politics and finances_

> **Retrieve all posts created given a specific date.** `GET: http://localhost:4000/api/v1/posts/filter_by_date/YYYY-MM-DD`

> **Retrieve all posts created by a specific user.** `GET: http://localhost:4000/api/v1/posts/allPosts/:idUser`

_For the following endpoints it's mandatory to be a registered user, **don't forget to add the token to the header authorization**._

> **Create a new post.** `POST: http://localhost:4000/api/v1/posts/allPosts`
>
> ```
> Example for adding to body:
>
> {
> "title": "Boris Johnson's no confidence vote ",
> "opening_line": "Boris Johnson says ministers should focus on ‘cutting costs of government’",
> "text" : "lorem ipsum bleble",
> "topic": "politics",
> "photo": ""
> }
> ```

> **Edit a post.** `PATCH: http://localhost:4000/api/v1/posts/:idPost`
>
> ```
> Example for adding to body:
>
> {
> "title": "Boris Johnson will be the next UK president "
> }
> ```

> **Delete a post.** `DELETE: http://localhost:4000/api/v1/posts/:idPost`

> **Vote a post.** (+1 || -1) `POST: http://localhost:4000/api/v1/posts/vote/:idPost`
>
> ```
> Example for adding to body to vote +1:
>
> {
> "is_vote_positive": "true"
> }
> ```

> **Update a vote.** (+1 || -1) `POST: http://localhost:4000/api/v1/posts/vote/:idPost`
>
> ```
> Example for adding to body to vote -1:
>
> {
> "is_vote_positive": "false"
> }
> ```

> **Delete your own vote from a post.** `DELETE: http://localhost:4000/api/v1/posts/vote/:idPost`

### Back-end Tech Stacks:

- **NPM**
- **EXPRESS**
- **MYSQL**
- **POSTMAN**

### Dependencies:

- Bcrypt
- Dotenv
- Express
- Jsonwebtoken
- Mysql2
- Nodemon
- Joi
- Uuid
- Node-mailjet

## Starting:

### Clone the repository:

`git clone git@github.com:clauCampos/newsApp.git`

### Fill the .env file

> You can rename the .env.example to .env and complete it with your data.
>
> _To use the postman collection as it is, it would be recommended
> to set the SERVER_PORT = 4000._

### Install dependencies:

```
npm install
```

### Create database:

```
npm run create_db
```

### Create the tables:

```
npm run init_table
```

### Insert data in tables:

```
npm run data_loader
```
### Move default images to inside new images folder:

```
npm run move_images
```

### Run the project!

```
npm run dev
```

## Database:

### Table Users:

- id
- nick_name
- email
- password
- bio
- avatar
- registration_code

### Table Posts:

- id
- title
- opening_line
- text
- topic
- photo
- actual_date
- user_id (FK)

---

### Thanks for checking our project 🙏🏼

Feel free to give us your feedback or tell others about this project. 📢

### Authors: 👩🏽‍💻

- [Yasmín Lorenzo](https://github.com/yassscoder)
- [Claudia Campos](https://github.com/clauCampos)
