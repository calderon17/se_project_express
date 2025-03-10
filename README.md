# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

my description of the project: So with confidence i can i say i have finished a full frontend of my project for the weather app "What to Wear" or WTWR for short, in this app you will be able to upoload pictures of you clothes and add them to a group of hot, warm or cold, after so the app will know the how the weather is like and help you decide on you piece of clothing depending on temperature and obviuosly weather. as of right now this specific prject is to handle the backend of the project to make API request for the action of the app like adding the photos, deleting, etc. all this to be connected to a live server.

technologies and techniques: for this app we have made a total for now 2 main files (users and clothingItem) where they each have a model(schema) where we define the database structure, controllers where we handle the logic, and routes to define API endpoints and connect them to controller. to both test and use the servres, we have used postamn and mongoose, to make sure the request devlier and handle the error appropriately.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
