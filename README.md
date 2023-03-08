# Task Manager - FrontEnd

This frontend application is developed using Angular, and is deployed on Azure at - [Task Manager](https://task-manager.azurewebsites.net/). To implement this application, followed tutorial by [Devstackr - Build a Task Manager Application](https://youtu.be/V-CeWkz1MNQ)

Styled the application using SASS.

## Features

1. Login: User can login to the application by entering the email address and the password. If the user has not registered then error message will be displayed.
2. Sign Up: If user wishes to register into the application, user can do so by entering the email address and password.
3. Sign Out: The user can logout of the application by clicking on teh 'Sign Out' button inside the application.
4. List
   - Create List: User can create a new list by clicking on the 'New List' button on homepage. User will be navigated to a new page where user can enter the list name.
   - Edit List: User can edit an existing list by clicking on the 'Pencil' icon when user hovers on the list
   - Delete List: User can delete a list by clicking on the 'Trash' icon when user hovers on the list. When a list is deleted, its corresponding tasks also gets deleted.
5. Tasks
    - Create Task: User can create a task by clicking on the '+' button on the homescreen. User needs to select the list from the LHS pane under which the taks needs to be created. User will be navigated to a new page where user can enter the new task name.
    - Edit Task: User can edit the task by clicking on the 'Pencil' icon when user hovers on the task.
    - Delete Task: User can delete the task by clicking on the 'Trash' icon when user hovers on the task.
    - Mark Task Complete/Uncomplete: User can mark the task as 'Complete/Uncomplete' by clicking on the task name. If the task is marked as complete, it will be striked through, eg. ~this is a task~


## To run application locally

To run the application locally, follow the below steps - 
1. Clone this repository
2. Locally, open the terminal where you have cloned this project. Travel inside the folder 'task-manager' in terminal. type ```npm i``` to install the required packages listed in package.json file.
3. After step 2, type ```ng serve --open``` in terminal to start the application.

