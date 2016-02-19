
#Crowdsourced Notes

###Summary
Sharing platform where people can share notes. Platform is sorted according to class/section, and people can vote on which notes are great.

###Users and Use Cases
**Users**: Students, Professors, Columbia affiliated people for now
**Use Cases**:
Sharing class notes, links, resources
Catching up on notes from a missed class

###Technical Requirements
Front-end - HTML/CSS/Javascript
Back-end - Node
DB - MongoDB

###Features
1. Log in with Columbia email
  - Log in with Columbia email (or maybe just edu)
  - OAuth/Passport (Node.js)
  - 4 hours (max)
2. Posting(Text, Image) + Voting
 - Under Class/Section, users can post notes (pdf/doc/txt?), as well as links to related resources. These can be voted (up/down) according to importance / relevance
	- Store documents in Mongo
	- Subtasks
		- Posting to Backend (2-3 hours)
		- Backend pushing to database (very quick)
		- Building the UI (A long time)
		- Database Logic/Schema (pretty long too, these need to be broken down)
3. Navigation System + Search
	- Be able to look at a web page that displays all the classes available within a school. Display: (Class -> Semester -> Section -> Lectures -> Resources). Have the ability to search for Topic/Class/Section
	- Mongo Schema and Navigation through Routing
 ???
4. Sorting/Filtering system
	- Sort by Topics, Class, Rating
5. Real Time Chat System
6. Collaboration on Documents through Google Docs

###Minimum Viable Product
A webpage that allows you to navigate through the different classes and allows users to post notes/resources and rate them.


###Priorities
1. Plan out architecture/UI (3 hours?)
	- Database Schema
	- User Schema
	- Post Schema
	- Class Schema
2. Mockup UI and User Flow
	- Design/Plan Different Screens
	- Write View code (HTML/CSS/JavaScript)
3. Set Up API / Front End Structure
	- Establish API/contract between frontend and backend (REST?)
4. OAuth
	- Posting System
	- Implement Post Schema
Set up Backend to Receive data and save to database
5. View Navigation / Search


###Timeline
1. **Total time**: 9 weeks x 4 hours x 4 people = 144 hours + outside time
2. **Dates**
	- By Feb 26
		- Plan out UI and App Structure (2 hours)
		- API one server, Front End Other
		- Set up Dev Environment (30 mins)
		- Establish API/contract between frontend and backend (1-2 hours)
	- By Mar 4 (Midterms)
		- Finish Setting up the App Structure (if not) (1 hour)
		- Setup OAuth and User Schema (4 hours)
		- Start Building Views (?) (
	- By Mar 11 (Spring Break?)
		- SPRING BREAK
	- By Mar 18
		- Finish OAuth if Not Done
		- Start Working on the Classes System
		- Continue With Views
	- By Mar 25
		- Keep Working on Views and Classes
	- By Apr 1 [Finish Front End MVP by End March]
		- Be Done with Views/Classes
	- By Apr 8
		- Start Implementing posting notes and resources
		- Start working on Navigation with basic data
	- By Apr 15
		- Keep working on Previous things
	- By Apr 22 - Overflow
	- By Apr 29 - Overflow
	- By May 6 (finals)

###Milestones
Assigning people to tasks

####Week 1
 - Get set up with Github - @Brian, 1 hour
 - Create a Hello World Flask app - @Brian, @Bob, 1 hour
####Week 2
