<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Question-and-Answer</h3>

  <p align="center">
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/LynnHaDo/QnA-Website/issues">Report Bug</a>
    ·
    <a href="https://github.com/LynnHaDo/QnA-Website/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#wireframes">Wireframes</a>
    </li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#works-cited">Works Cited</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- UPDATES -->
## Wireframes

Link to the [wireframes](https://www.figma.com/file/DMuoU60lWRVJYB5TXk9u9G/QnA?type=design&node-id=4%3A134&mode=dev&t=qDJ6xfZDcTgVLWdq-1) for the website.

<!-- ABOUT THE PROJECT -->
## About The Project

<p align="right">(<a href="#top">back to top</a>)</p>

### Progress

- [x] Wireframes
- [x] Add basic Angular frontend skeleton
- [x] User authentication set-up 
    - [x] Django models and APIs setup
    - [x] Django login/logout with access & refresh tokens
    - [x] Angular login 
    - [x] Google authentication (Bugs: Angularx Social Login package button does not work after signing in)
- [x] Create Python scripts to import CSV into database
- [x] Set up Django APIs to send answers to questions
- [x] Render questions, assignments, roster 
- [x] Integrate text editor to answer submission
- [x] Render answer on the front-end, post answer to database 
  - [ ] Fix some issues with permissions
- [x] Generate clusters. Save those to the database
- [x] Clean question data (Remove n/a's) before saving it into database
- [x] Render clusters to the frontend. 
- [x] Add option to claim questions in the clusters. Reserve claimed questions. Save info to database.
- [x] Add option to answer multiple questions at once.
  - [ ] Fix bug with rendering questions after answering
 

See the [open issues](https://github.com/LynnHaDo/QnA-Website/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- Django 5.0.3
- Angular 16.2.12
- MySQL 8.3.0
- [MailHog](https://github.com/mailhog/MailHog) (for testing emails)

More information on packages can be found in `requirements.txt`.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
### Prerequisites

### Installation

1. Clone the repo

```
git clone https://github.com/LynnHaDo/QnA-Website.git
```

**Set up the backend**

2. Navigate to `backend` folder
3. Run on server

```
cd backend
python3 manage.py runserver
```

**Set up the frontend**

4. Navigate to `frontend` folder
5. Before `npm install` to install packages, make sure the correct version of Angular is installed.
6. Run on server

```
cd ../frontend
npm install 
ng s
```

### Import data: Run Django scripts 

*Refer to `backend/samples` for sample `.csv` files*

- Import course

```
cd backend
python3 manage.py runscript import_course --script-args [PATH/TO/COURSE.csv FILE]
```

- Import assignments

```
python3 manage.py runscript import_assignment --script-args [PATH/TO/ASSIGNMENT.csv FILE]
```

- Import questions

```
python3 manage.py runscript import_questions --script-args [PATH/TO/QUESTIONS.csv FILE] [ASSIGNMENT_ID]
```

- Delete questions of an assignment

```
python3 manage.py runscript delete_questions --script-args [ASSIGNMENT_ID]
```

- Generate clusters for all questions in an assignment

**Note**: Clustering results differ each time this is invoked since the algorithm is non-deterministic. 

```
python3 manage.py runscript create_clusters --script-args [ASSIGNMENT_ID]
```

<p align="right">(<a href="#top">back to top</a>)</p>

