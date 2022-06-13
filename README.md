## 📝 PROJECT COLLABORATIVES NEWS

### Description: 

API that allows managing collaborative news.

Users can view a list with the latest news of the day, news from previous days, filter news by 
fixed thematic categories and register as a user.
Registered users can also edit and delete news published by the user, vote positively or negatively (coming soon).

## Endpoints 💻

_In the postman folder you have a json with all the configured endpoints.Also I leave them here:_

### USERS 👤

>__Create a new user.__
`POST: http://localhost:4000/api/v1/user/signin`
>```
>Example for adding to body:
>
>{
>"nick_name": "user test'",
>"email": "test@gmail.com" ,
>"password": "prueba",
>"bio" : null,
>"avatar": null
>}

>
>__Login as user.__ 
`POST: http://localhost:4000/api/v1/user/login`
> ```
> Example for adding to body:
>
> {
> "email": "maria@gmail.com" ,
> "password": "maria123"
> }

### POSTS 💬

>__Retrieve all posts.__
`GET: http://localhost:4000/api/v1/posts/allPosts`


>__Retrieve last day posts.__
`GET: http://localhost:4000/api/v1/posts/get/latestPosts`

>__Retrieve all posts categorized with a specific topic.__
`GET: http://localhost:4000/api/v1/posts/:topic
`
>
> **current topics are: sports, politics and finances*

>__Retrieve all posts created given a specific date.__
`GET: http://localhost:4000/api/v1/posts/filter_by_date/YYYY-MM-DD`

_For the following endpoints it's mandatory to be a registered user, **don't forget to add the token to the header authorization**._

>__Create a new post.__
`POST: http://localhost:4000/api/v1/posts/allPosts`
>```
>Example for adding to body:
>
>{
>"title": "Boris Johnson's no confidence vote ",
>"opening_line": "Boris Johnson says ministers should focus on ‘cutting costs of government’",
>"text" : "lorem ipsum bleble",
>"topic": "politics",
>"photo": ""
>}

>__Edit a post.__ `PATCH: http://localhost:4000/api/v1/posts/:idPost`
>```
>Example for adding to body:
>
>{
>"title": "Boris Johnson will be the next UK president "
> }

>__Delete a post.__
`DELETE: http://localhost:4000/api/v1/posts/:idPost`


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

## Starting:

### Clone the repository:

`git clone git@github.com:clauCampos/newsApp.git`

### Fill the .env file 

> You can rename the .env.example to .env and complete it with your data. 
>
>_To use the postman collection as it is, it would be recommended 
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

### Table Posts: ###
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

