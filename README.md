<h1>STUDENT PLANNER - COMP1004 Project (Overview)</h1>

<h2>Important!!</h2>

Before using this repository or downloading the code to use the application, I encourage you to read the 'Personal Data Statement' also found in this repository. It highlights the need to comply with UK GDPR Laws, and how I have done my utmost best to adhere to these laws. It should be clear - **No Personal Data is collected or processed by the developer of the application. No data is sent to any external servers. All data is processed locally.** Therefore, I recommend that you do not use this tool on a shared device, as the information is all stored in plain-text in your localStorage. Future updates to the repository may include better security implementations such as encryption.

<h2>Project Vision: What is it?</h2>

The student planner can simply be described as a To-Do list with additional features. These additional features include a Module page where you can list down your module information. As the name and features suggest, the target audience for this app is students.

The To-Do list is simple. Students are able to add tasks, and then list them on the tasks page. Everytime that a student completes a task, they can click it off the list and then it is stored in the completed tasks list that can be found at the very top of the task list<sup>[1]</sup>. Should the user realise that they didn't really complete the task, they can do this by simply unchecking it.

Then there is the module page where students can keep track of the key information on their modules. At the University of Plymouth, students use the Moodle service, or simply DLE. Here, students can review everything they need to know about their module. The difference between the Student Planner and the DLE, is that the module page and tasks are both part of the application. So there is navigating between different application windows to make the changes or note down the information that you need when adding your tasks to the page. 

The modules page has a very simple design, inspired by the UCAS platform. Each module is presented in cards that are about a third of the page's length, displaying key information about the module. To view this information in more detail, users can click the 'view more' option on the cards. This expands the module and provides more details about the contents of the module like assignment deadlines, exam dates, and their contributions to the overal module mark.

But you do not have to expand the modules cards just to see which assignment is due next. For this, you can click on the assessments page in the navigation bar. The assessments page displays all your assessments, exams and assignments in ranking by due date. The closest deadline, first, going down to the one with the furthest deadline.. You can also add some assessments from here too, you just have to supply the module code to go through with the action. This improves the user experience, because it means less navigation and more organising.


<h3><ins>Why I chose this as my project?</ins></h3>
Learning how to do something requires challenging obstacles. With no prior experience using web development tools, the student planner was a great opportunity to expand my skillset. It provided both a challenge, as well as a chance to make something that can be used in the real world. The idea was born from the casual conversations I had with some friends across different universities. They pointed out that one of the challenges they face is having an application that helps them keep their student life organised. They had to use multiple apps to get it organised. So why not create one app, with the aim of reducing the number of apps needed to stay organised into just one. 

While my application is not meant to fully replace the other fully established apps (e.g. Notiong, and even Google Calendar - never underestimate the power of a calendar) used across the world in the productivity cactegory, it is starting point. So I can say I am proud of what I came up with.


<h3><ins>How did I do it?</ins></h3>
For this project, we were only permitted to use the following tools:

`HTML`
`CSS`
`JavaScript`

The learning curve was steep at the beginning, but I eventually got the hang of it. All the resources that I used to learn how to use these tools are listed at the very bottom of this `README.md` document. It was a stressful beginning, as I did not know much about the tools, but just applying them for different cases was useful and the help of the online resources made it even easier. Credit must also be given to the staff members from my module and the senior students from the University's PALS sessions, who provided me with guidance and some advice on how to be successful with this project. 

For any successful project, the planning and improvisation must be well off. To achieve this, I made use of the Agile Software Development Methodology. Breifly speaking, Agile is in my words, a philosophy that can be applied by Software Developers during the creation of a product or service. The method mainly involves carrying out some risk analysis, creating project goals, and figuring out how to achieve them. This is not a one way process, but an iterative one. That means that you will run into the aspect of planning more than once, and you may make some changes here and there when you see that your current method is not working. However, through Agile, common pitfalls are covered in the planning, so it also saves on the amount of time that developers use. From what I can tell, this method is insanely useful the more you are experienced, but isn't that the case for anything. 

Every 2 weeks, I would work on a achieving a goal for this project, then I would discuss my work with staff members from my module. And if they had any feedback, I would take it and that is how I learnt most of the stuff. For more information on the Agile Methodology, particularly Scrum, the one I used, check out [Srcum.org](https://www.scrum.org/resources/scrum-guide). 


<h3><ins>What were the requirements of the project?</ins></h3>
I will keep it short...

1. You should be able to add a task. :white_check_mark:
2. You should be able to check off a task from the list when it is complete. :white_check_mark:
3. You should be able to edit or delete that task. :x: (You can delete a task, but not edit it <sup>[1]</sup>)
4. You should be able to add a module. :white_check_mark:
5. You should be able to edit the contents of that module or delete the module and its associated contents. :x: (You can edit most of the module contents, but you cannot edit the assessments <sup>[1]</sup>)
6. This information should be stored somewhere, and be loaded everytime the user starts or opens the web application. :white_check_mark: (Information is stored in the localStorage of your web browser. But this can always be improved in future repository updates).


<h4><ins>References</ins></h4>
<ul>
  <li>Coding2Go - YouTube Channel (https://www.youtube.com/@coding2go)</li>
  <li>BroCode - YouTube Channel (https://www.youtube.com/watch?v=lfmg-EJ8gm4 , https://www.youtube.com/watch?v=HGTJBPNC-Gw)</li>
  <li>w3Schools - Tutorial Website (https://www.w3schools.com/html/html_intro.asp , https://www.w3schools.com/css/css_intro.asp , https://www.w3schools.com/js/js_intro.asp)</li>
  <li>GeeksforGeeks - Community-like Website (https://www.geeksforgeeks.org/) </li>
  <li>MD Web Docs - Community-like Website (https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website)</li>
  <li>And of course, the good old reliable 'Stacks Overflow' - Community-like Website/Forum (https://stackoverflow.com/questions) </li>
</ul>



