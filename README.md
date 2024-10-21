# School Management System

**Project Description**

This School Management System streamlines communication between the school administration, students, and parents. The admin registers students and their parents simultaneously, ensuring both have access to important updates. When the admin sends a memo, it is displayed on the respective dashboards of both the student and their parent, keeping all parties informed.

**Features**

*Admin Panel:*

1. Register students and their parents together.
2. Send memos that are visible on both the student and parent dashboards.

*Student and Parent Dashboards:*

1. Students and parents can log in to their respective dashboards to view memos sent by the admin.

**Technology Stack**

1. Backend: Node.js, Express.js
2. Frontend: EJS (Embedded JavaScript templates)
3. Database: MongoDB

**Installation and Setup**

1. Clone the repository: *git clone https://github.com/Jayranking/school-management.git*
2. Navigate to the project directory: *cd school-management*
3. Install the dependencies: *npm install*
4. Set up environment variables in a .env file:

     APP_PORT = 2001

    DB_URI = mongodb://127.0.0.1:27017/sch-management
    
    TOKEN_SECRET = ""
    
    ==Email config==
   
    EMAILFROM = ""
   
    EMAIL_KEY = ""







