# HadasimHomeTask

מערכת ל לניהול מאגר קורונה עבור קופת חולים

צד לקוח כתוב ב REACT

כדי להריץ יש צורך להוריד את הפרויקט להריץ 
npm start

ואז לפתוח ב [http://localhost:3000](http://localhost:3000)

צד שרת כתוב ב NODEJS

כדי להריץ יש צורך להריץ npm i

ואז node index.js  

ואז לפתוח ב [http://localhost:3001](http://localhost:3001)

המסד נתונים הוא MySql מקומי על המחשב שלי

תמונות דמו מהאתר:

דף ראשון מציג רשימת הלקוחות הקיימים

<img src="https://github.com/bina100/HadasimHomeTask/blob/master/images/UsersList.png" width="50%"></img>


לחיצה על כפתור + למטה יפתח חלון פרטים ריק בשביל להוסף משתמש חדש

<img src="https://github.com/bina100/HadasimHomeTask/blob/master/images/AddNewUser.png" width="50%"></img>

לחיצה על השורה של לקוח יפתח את החלון פרטים שלו להצגה בלבד, זאת אומרת לא ניתן יהיה לערוך את הפרטים שלו.

<img src="https://github.com/bina100/HadasimHomeTask/blob/master/images/ShowUser.png" width="50%"></img>

לחיצה על אייקון עריכה יפתח חלון פרטים עם אפשרות עריכת כל פרטי הלקוח.

<img src="https://github.com/bina100/HadasimHomeTask/blob/master/images/UpdateUder.png" width="50%"></img>

לחיצה על אייקון מחיקה ימקח את כל פרטי המשתמש.

המסד נתונים בנוי כך:

טבלת פרטים אישיים של משתמש בשם users

טבלת סטטוס לכל משתמש יש אפשרות של 2 סטטוסים, חולה ומחלים בשם users_status.

<img src="https://github.com/bina100/HadasimHomeTask/blob/master/images/db1%20.png" width="50%"></img>

טבלת חיסון מגדיר עבור כל חיסון ID ,נקרא בשם type_vaccine 

וטבלת חיסונים של משתמשים בשם vaccine_users.

<img src="https://github.com/bina100/HadasimHomeTask/blob/master/images/db2.png" width="50%"></img>



לצערי לא הספקתי לעשות בדיקות תקינות על הקלטים

.לדוגמא אם תאריך של חיסון ראשון תמיד לפני החיסונים הבאים 
.וכן תקינות ת"ז/ טלפון

