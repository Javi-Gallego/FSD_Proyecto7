# Welcome to Rocket Social Network

<center><img src="./src/img/readme/favicon.png"/></center>

This is the seventh project in the Full Stack Developer Bootcamp at GeeksHubs. In these two weeks I've tried to make my own version of a social network. I hope you like it.

  ## Content 📝
  <ol>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#deploy-🚀">Deploy</a></li>
    <li><a href="#local-installation">Installation</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#problems-solutions">Problems solutions</a></li>
    <li><a href="#future-features">Future features</a></li>
    <li><a href="#development">Development</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>

## About the project

Create a social network that allows users to post messages.

To do that you must register and login.

Along the text of maximum 150 characters you can send an image and write keywords. These key words are used to make statistics of what people is talking about and to search posts throught words (not implemented actually).

You can change your photo profile, your password or add your name and lastname to your profile info. You can also make your profile public or private if you don't want to be seen by anyone and for that, one of the main features is that you can follow users and they can follow you. Anyone in your following list can see your post even if your account is set to private.

As superadmin you can see and delete any user and use filters the search.
<div style="display: flex; justify-content: space-around;">
<center><img src="./src/img/readme/mobile.gif"/></center>
<center><img src="./src/img/readme/mobile (1).gif"/></center>
<center><img src="./src/img/readme/mobile (2).gif"/></center>
</div>

## Stack

<div align="center">
<a href="">
    <img src="https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=White" alt="React" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript"/>
</a>
<a href="">
    <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" alt="JWT" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="JWT" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/photoshop-%2331A8FF.svg?style=for-the-badge&logo=adobe%20photoshop&logoColor=white" alt="JWT" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/JWT-287606?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</a>
 </div>

## Deploy 🚀
<div align="center">
    <a href="https://master.d7v7mblczdmtr.amplifyapp.com/"><strong>https://master.d7v7mblczdmtr.amplifyapp.com/</strong></a>🚀🚀🚀
</div>


## Local installation

1. Clone the repository
` $ git clone https://github.com/Javi-Gallego/FSD_Proyecto7.git `
2. Install dependencies
` $ npm install `
3. Run React project
` $ npm run dev `

Unfortunately, the server is hosted on a free site and it is very likely that is not online the moment you want to see this project. In this link you have the repository (an Express made server working with a MySQL database) and the instructions to install it locally:
https://github.com/Javi-Gallego/FSD_Proyecto5.git

If you need to run the server locally, you will need to go to ./src/services/apiCalls.js and put the right urlRoot.
<center><img src="./src/img/readme/rooturl.jpg"></center>

## Pages

To log as a super_admin 
``` js
    "email": "super_admin@gmail.com",
    "password": "Aa123456"
```
To log as a normal user you can either use this one or you can register your own
``` js
    "email": "silvia@gmail.com",
    "password": "Aa123456"
```

:earth_africa: 
<details>
<summary>Non registered users </summary>

- REGISTER :earth_africa:

<center><img src="./src/img/readme/register.jpg"></center>

As you are writing in the inputs you can see if the field has an error and is not valid

- LOGIN :earth_africa:

<center><img src="./src/img/readme/login.jpg"></center> 


To log as a super_admin 
``` js
    "email": "super_admin@gmail.com",
    "password": "Aa123456"
```
To log as a normal user (or you can register your own)
``` js
    "email": "silvia@gmail.com",
    "password": "Aa123456"
```
</details>
</br>

:lock:
<details>
<summary>Registered users</summary>

- HEADER 

<center><img src="./src/img/readme/navbar.jpg"></center> 

Detail of de header when a user is logged. There are three sections.

In the left we can go to "profile", "my posts", "following" and "search". In your profile you can change your first and last name, your photo, your password and you can 

- PROFILE

<center><img src="./src/img/readme/profile.jpg"></center> 

A detailed view of the user data. You can update some of the fields.

If you want to change password you will be switched to another page.

If you make your profile private your post will not be seen by anyone outside your following list

If you deactivate your account, you no longer will be able to log in. Your profile and posts will not be reachable.

<center><img src="./src/img/readme/changepassword.jpg"></center>

- LAUNCHER

<center><img src="./src/img/readme/launcher.jpg"></center>

A rocket can not be put in motion without a "Launcher". In the Launcher you will have three sections: Timeline, +Rated, +Trendy (+Trendy is not implemented as for now)
Timeline are the post of those who are in my "following" list 
+Rated is a list of the 10 most liked posts
+Trendy will be a list of the words most used to describe our posts and a way to see what topics are important for the users.

- WRITE POST

<center><img src="./src/img/readme/writepost.jpg"></center>

You can upload a photo clicking on the image and write a text of maximum 150 words. In the last input you can write words separated by a space (with this keywords the +Trend will be created)

:angel:
<details>
<summary>Super admin</summary>

- USERS 

In this page you can search for any user in the database and apply three optional filters: name, email and role
The search will retrieve all users than matches the filter partially, if you search por the name "er" and you have an user with the name "Javier" that user will be shown

<center><img src="./src/img/readme/searchuser.jpg"></center>

You can choose how many results will be shown in each page and navigate through the different pages

<center><img src="./src/img/readme/searchuser2.jpg"></center>

If you click in any user you will see a detailed view and you can delete the user from the database (only deactivate users can be deleted). Change role is not implemented.
</details>

## Problems solutions
The project with the most problems. Problably because social network's are something we know well and a lot of ideas came up, unfortunately, when I was making the backend I didn't take this things in consideration because I had never make any front end project. It was a challenge and I did as much as I could in the thight scheduled until the deadline. It was satisfying researching to find ways to upload images, to use CSS variables for the first time to make custom themes, using Redux for the first time... 

## Future features
[ ] super_admin can change roles or update fields of the users profile
[ ] CRUD for posts as super admin
[ ] Better experience seeing posts. Only can see comments of the posts in your own posts.
[ ] Implement "Trends". Already made the back endpoint but not time to implement. A list of the most used keywords.
[ ] Fix some issues with links or updates when following an user.
[ ] Receive a notification each time a user follows/unfollows you.
[ ] Direct messages between users.
[ ] Admin views only can be managed with a big screen. The project was meant to be used in a mobile device if your an user and with a PC, laptop if you are an admin. I would like to make a more enjoyable experience even in a mobile phone if you are an admin.

## Development:

``` js
 const developer = "Javier Gallego";

 console.log("Desarrollado por: " + developer);
```  

## Contact
<div align="center">
<a href = "mailto:galgar@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/javier-gallego-dev"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
<a href="https://github.com/Javi-Gallego"><img src="https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
</div>