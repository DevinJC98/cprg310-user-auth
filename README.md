# cprg310-user-auth

## Notes for Tha Group

-alright gang, this took me far longer than i thought it would and it's almost 4am so i'll type this out while i'm still lucid.

this repo is made up of two parts, the directus folder, and the my-app folder.

my-app is just your standard next file theres no special razzle dazzle you need to to to run it, just cd into the my-app folder, run "npm run dev" and bobs your uncle.

the directus folder is where things get tricky.

from what i can tell directus is typically ran on a very expensive cloud service, i aint coughin up no dough so we're doing things the cheap and difficult way.

First things first you're goin to need to install docker, theres a link inside this here readMe you happen to be reading. docker is how we get directus installed and its how we run it locally. no docker, no directus.

when you're testing out the repo, slap next up and running as usual.

To get the cms loaded you need to open docker and let that run in the background. once the programs up and running then you can open up a terminal and cd into the directus folder. once thats all good, you run the command "docker compose up" then go to http://localhost:8055 and bob's still your uncle.

admin log-in credentials are stored in directus/docker-compose.yml but to make things easy breazy for you they're also right below this sentence.

Email: Admin@example.com
Password: admin-password-1

ignore the three sub-folders. the directus data is stored there automatically.

once you're in, wham. Guillermo's your del toro. You've got a cms.

**while i'm here i might as well get you up to speed on what i've done**

the basic structure and bones of this project are up and running. login, and registration are both working and will actively work with the database. i'm probably 90% done with the authentification

I'm still having some issues with the logout button (my-app/src/app/api/auth/logout/route.js), it returns an error on the try/catch statement.

the dashboard is also giving me pain.

(my-app/src/app/pages/dashboard/page.js line 12) withing the h1 i've got a whole {response?.user?.email} thing going on that should be pulling the users email and presenting it on the page but it's not for some reason.

Third issue but not much of an issue

(my-app/src/app/pages/register/page.js lines 15-18) These part of the form are currently useless. i added them in after everything else was set up.

if either of you want to have a terrible time, go ahead and take a look, otherwise i'll spend time on it tomorrow.
I also plan on coming back to clean up the code a wee smidgen and add comments to help explain what the code's doing. If you have question's shoot me a message. I would have liked to get this done tonight but again, 4am.

**Stylings**

if you read through all of my nonsense and want to get started on this baby. You're in luck. Each piece of the puzzle comes with a blank css file that should already be linked to its corresponding page unless i did it wrong. 4 in total. there are 3 in the "my-app/src/app/pages" folder. one for each page. theres also the globals.css if any stylings should be applied to the whole app or if you wanted to give some love to the landing page.

for the dashboard theres a link to the primary tutorial i used at the bottom of the read me. somewhere deep in the bowels of the tutorial theres an example you can use for passing component properties as well as instructions to build said components near the top.

If you change any of the code outside of the css files let me know so theres no contradicting files when we merge.. i'm sure merging all the forks will suck tremendously either way but we'll cross that bridge when we get to it.

otherwise

My brain hurts
-D

## Testing Commands

fill this in later

## Install Process

Create Github Repository

Download and install docker inside repository
@ https://docs.docker.com/get-docker/
-this is required to install and run directus
-run command "docker run -p 8055:8055 directus/directus" in terminal to create docker project

Create Next App
Run Command "npx create-next-app@latest" in repository folder to create next app
Run Command "npm install @directus/sdk to install dependancies

## App Creation

Primary Tutorial -https://directus.io/docs/tutorials/getting-started/using-authentication-in-next-js
