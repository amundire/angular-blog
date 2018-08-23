Desc: 
A site using Angular 6 to render and send information into a Kinvey (BaaS). It maintains data such as users and articles.

Public area:
An anonymous user is able to view the home page and the details of articles. Any user has access to the search box functionality.

Private area: 
A logged in user is given the ability to create his own articles that he can later list in the My Articles section. A user can only edit his own articles but is able to see all others.

Administrator area:
An admin has permissions to edit/delete all other articles in addition to banning other users/admins.

Article area:
Details:
Renders the title, content and refactored 'estimated time created' (ect) as time ago posted. Depending on authorization, buttons appear on this page.
Create:
A form that when successfully filled and submitted, sends a POST request to the BaaS and uploads the article to the database.
All:
A basic GET request area that renders every single article and renders buttons based on user authorization.
Search:
A query based filtering on the same GET request from above.
My: 
A filtering on the GET/All request that only renders articles which have the same author as the current user.
Edit:
A form that works similarly to the Create page, but uses a PUT request instead.
Delete:
Only admins are allowed to delete articles.

Users:
Sign Up:
Requires username, email and password. Banned usernames are unable to be taken by new users.
Sign In: 
Requires username, password. Banned users are unable to login.

Each page uses a different DocumentTitle.