## 📝 PROJECT NOTICIAS 

### Description: 

API that allows managing collaborative news.

Users can view a list with the latest news of the day ordered by rating, view news from previous days, filter news by fixed thematic categories and register as a user.
Registered users can also edit and delete news published by the user, vote positively or negatively on other news and manage their user profile.

### Back-end Tech Stacks:
- **NPM**
- **EXPRESS**
- **MYSQL2**
- **POSTMAN**

### Dependencies:
- minimist
- dotenv
- populateDB
- file-loader
- sharp
- bcrypt

### devDependencies:
- nodemon

## Install:

### Clone the repository:
git clone git@github.com:clauCampos/newsApp.git

### Fill the info in the .env file following  .env.example file's structure

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

## Data Bases:

### Table Users:
- id
- name
- email
- bio
- avatar
- role (+)
- -registrationCode (+)

### Table Entries: ###
- id
- title
- photo
- text
- topic

---

### Thanks for checking our project 🙏🏼

Feel free to give us your feedback or tell others about this project. 📢 

### Authors: ###

- [Yasmín Lorenzo](https://github.com/yassscoder)
- [Claudia Campos](https://github.com/clauCampos)

