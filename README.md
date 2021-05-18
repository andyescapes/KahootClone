**ReactJS: Kahoot Clone**

This project is closely modelled off the popular game [kahoot](https://kahoot.com/). The main libraries used were react, material-ui and react router dom.

To run navigate to both the `frontend` and `backend` folders and run `yarn install` to install all of the dependencies necessary to run the ReactJS app. Then run `yarn start` to start the ReactJS app.

Overall features of the project are listed below.

### Feature 1. Admin Auth 

#### 2.1.1. Login Screen
 * Users are able to login via the initial log in scree

#### 2.1.2. Register Screen
 * Users can register via the registration link from the login

#### 2.1.3. Logout Button
 * A nav bar allows users to log out at any time.

### Feature 2. Admin Creating & Editing a Game

#### 2.2.1. Dashboard
 * A dashboard exists containing all the games
 * Users can start, stop and advance games for their players

#### 2.2.2. Edit BigBrain Game Page
 * This screen allows users to select the question they want to edit
 * This screen allows users to delete a particular question, or add a new question

#### 2.2.3. Edit BigBrain Game Question Page
 * Ths screen allows users to edit questions including:
   * The question type (multiple choice, single choice)
   * The question itself (as a string)
   * Time limit that users have to answer the question
   * Points for how much the question is worth
   * The ability to optionally attach a URL to a youtube video, or upload a photo, to enhance the question being asked).
   * Anywhere between 2 and 6 answers, that each contain the answer as a string

### Feature 3. Admin Start, Stop, Results of game

#### 2.3.1. Starting a game
 * Admins can start games that lead to a popup with a link to copy to clipboard of the game which is to be started.

#### 2.3.2. Stopping a game
 * Admins can also stop games

#### 2.3.3. Getting the results of a game
 * The results screen contains the following
   * Table of up to top 5 users and their score
   * Bar/Line chart showing a breakdown of what percentage of people (Y axis) got certain questions (X axis) correct
   * Chart showing the average response/answer time for each question

### Feature 4. Player able to join and play game 

#### 2.4.1. Play Join
 * A user is able to enter a session ID and their own name to attempt to join the session. If succesful, they're taken to `2.4.2`.

#### 2.4.2. Play Game
 * On this screen the user receives the question being asked, including:
   * The question text
   * A video or image depending on whether it exists.
   * A countdown with how many seconds remain until you can't answer anymore.
   * A selection of either single or multiple answers, that are clickable.
 * The answer is sent to the server the moment the user starts making selections. If further selections are modified, more requests are sent
 * When the timer hits 0, the answer/results of that particular question are displayed
 * The answer screen remains visible until the admin advances the quiz question onto the next question.

#### 2.4.3. Game Results
 * After the final question is answered, a page is displayed showing the key results:
   * The player's performance in each question

### 2.7. Testing

Component testing and user interface testing is completed using enzyme and cypress.

## 3. The Back-end (Provided)

The backend server exists in your individual repository. After you clone this repo, you must run `yarn install` in `backend` directory once.

To run the backend server, simply run `yarn start` in the `backend` directory. This will start the backend.

Your backend is persistent in terms of data storage. That means the data will remain even after your express server process stops running. If you want to reset the data in the backend, you can run `yarn reset` in the backend directory. If you want to make a copy of the backend data (e.g. for a backup) then simply copy `database.json`.

Once the backend has started, you can view the API documentation by navigating to `http://localhost:[port]` in a web browser.

The port that the backend runs on (and that the frontend can use) is specified in `frontend/src/config.json`.

