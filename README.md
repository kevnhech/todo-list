# todo-list
A basic, minimalistic to do list web-app.

# Requirements
Your ‘todos’ are going to be objects that you’ll want to dynamically create, which means either using factories or constructors/classes to generate them. (Done)

Brainstorm what kind of properties your todo-items are going to have. At a minimum they should have a `title`, `description`, `dueDate` and `priority`. You might also want to include `notes` or even a `checklist`. (Done)

Your todo list should have `projects` or separate lists of `todos`. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into. (Done)

You should separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules. (Done)

The User Interface should be able to do the following:
  1. View all projects. (Done)
  2. View all todos in each project (probably just the title and duedate… perhaps changing color for 3 different priorities). (Done)
  3. Expand a single todo to see/edit its details. (Done)
  4. Delete a todo. (Done)

Set up a function that saves the projects (and todos) to localStorage every time a new project (or todo) is created. (Done)

Set up another function that looks for that data in localStorage when your app is first loaded. (Done)