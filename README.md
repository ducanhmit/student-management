# Mini Project - Student Management


react-router-dom
@types/


/login: 
/admin: LAYOUT

/admin/*
/admin/dashboard: FEATURE
/admin/students: FEATURE


*** features
- login
- sign up / register
- forget password



CLICK LOGIN
- Call API to login
- Success --> redirect ADMIN
- FALIED --> show ERROR


LOGIN
LOGOUT



authSaga

LOOP
- if logged in, watch LOGOUT
- else WATCH LOGIN


LOGIN
- call login API to get token + user info
- set token to local storage
- redirect to admin page

LOGOUT
- clear token from local storage
- redirect to login page 

authSlice
- define actions, reducers
authSaga
- define effects







############### STUDENTS


ROUTING
- /admin/students: listing
- /admin/students/add: add new students
- /admin/stidnets/:studentId: udpate a student



LISTING

- Search by name
- Filter by city
- Sort by name, mark
- Pagination
  

STUDENT SLICE STATE:
- loading
- list
- filter {page: 1, limit: 10, ...}
- pagination


ADD/EDIT
- React Hook Form v7
- Yup



ROUTINGS
- /admin/students/add: add new student
- /admin/students/:studentId: update a student


Student Form
- Mode: Add/Edit
- Initial values
- Values:
    - name: Text input
    - age: Number Input
    - gender: Radio options
    - city: Select
    - mark: Number Input
- Validation: all required
    - name: at least two words
    - age: >= 18
    - gender: male/famale
    - city: required
    - mark: 0 -> 10
- Submissions: redirect to students list page after submitting successfully
