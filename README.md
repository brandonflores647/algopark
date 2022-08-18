<div align="center">

# Algo Park

</div>

<div align="center">
 
#### 'Algo Park' is a site designed to help you learn about different algorithms through its clean visualizations and interactivity. Choose from pathfinding or sorting algorithms. Draw on our pathfinding map and watch dijkstras algorithm navigate through the obstacles *you* created. Hop into our sorting page to randomize a set of stacks and choose your speed. Watch the algorithm of your choosing sort those stacks in real time!

</div>

<div align="center">
  
# Technologies & Tools

|React|Redux|Flask|SQLAlchemy|PostgreSQL|Figma|
| :-: | :-: | :-: | -------- | :------: | :-: |
| <a href="https://reactjs.org/"><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' width="75" height="75" /></a> | <a href='https://redux.js.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="75" height="75" /></a> | <a href='https://flask.palletsprojects.com/en/2.1.x/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" width="75" height="75"/></a> | <div align="center"><a href='https://www.sqlalchemy.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-plain.svg" width="75" height="75" /></a></div> | <a href='https://www.postgresql.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="75" height="75" /></a> | <a href='https://www.figma.com/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" width="75" height="75"  /></a> |

### [Checkout AlgoPark!](https://algopark.herokuapp.com/)
### [AlgoPark wiki](https://github.com/brandonflores647/algopark/wiki)
### [AlgoPark's Features](https://github.com/brandonflores647/algopark/wiki/Feature-List)
### [Database Schema](https://github.com/brandonflores647/algopark/wiki/Database-Schema)

</div>

## Want to contribute?

To fix a bug or add a feature, follow these steps:

- Fork the repository

- Create a new branch with git checkout -b feature-branch-name

- Make appropriate changes to the files and push back to github

- Create a Pull Request

  - Use a clear and descriptive title for the issue to identify the suggestion.

  - Include any relevant issue numbers in the PR body, not the title.

  - Provide a comprehensive description of all changes made.

## Setting Up and Starting a Local Server:

- Clone [the project](https://github.com/brandonflores647/algopark).
- Create a local database and owner user.
- Create a .env file using the .env.example provided in the project.
- Change directory into the frontend by running `cd frontend/` in the terminal, then run `npm install`
- Now in the root directory run `install --python "$PYENV_ROOT/versions/3.9.4/bin/python"` followed by `pipenv shell`.
- Next you will need to setup the backend. In your root terminal run `flask db migrate` followed by `flask db upgrade` and finally `flask seed all`.
  - You can now run the command `flask run` and your backend will start up, connecting you to an already seeded database.
- Now that your backend is up and running you can open a second terminal and `cd frontend/` followed by running `npm start`
  - This will automatically start the application on 'localhost:3000'.
  
## AlgoPark in action:
![2022-08-18-15-24-58](https://user-images.githubusercontent.com/100805072/185500985-4777d7ba-d001-46c1-9632-c08d9ef8f471.gif)
![2022-08-18-15-25-52](https://user-images.githubusercontent.com/100805072/185500993-b687991f-c1db-4592-8b0b-e3acfc34d02e.gif)
![2022-08-18-15-26-45](https://user-images.githubusercontent.com/100805072/185501013-f5747f10-9126-4d97-b373-f8432924bc38.gif)
![2022-08-18-15-27-51](https://user-images.githubusercontent.com/100805072/185501025-22515ad0-b9d4-4428-ae14-8d2460625336.gif)


### Created by: Brandon Flores
