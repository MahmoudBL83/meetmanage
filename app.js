<!DOCTYPE html>
<html lang="en">
    <head>
        <title>اسم المنصة</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cairo&family=Lato&family=Montserrat:wght@300&family=Open+Sans:ital,wght@0,300;0,500;1,400&family=Roboto&display=swap" rel="stylesheet">
    </head>
    <body>
        <div id="div1">
        <nav>
            <h1>اسم المنصة</h1>
            <h2 id="l21">انشاء وادارة غرف الفيديو كونفرانس<br></h2>
			<h2 id="dashboard">غرفة التحكم</h2>
            <h2 id="l23" style="display:block;position: absolute;right:10%;cursor:pointer;background-color: green;border:3px solid 777;border-radius: 40px;padding:20px;color:white;cursor: pointer;">Sign-in</h2>
        </nav>
        <section id="sec1">
            <div id="welcome"><p>اهلا بك في منصة انشاء <br>وادارة الفيديو كونفرانس<br> <span>انشئ غرفتك الان</span><input type="name" placeholder="Enter name of the room" id="roomname"></input><span id="meetlink"></span></p>
            </div>
            <div id="img1"><img src="4911324.jpg" alt=""></div>
        </section>
    </div>
    <div id="div2">
        <div id="messages">الرسائل</div>
        <div>الاجتماعات</div>
        <div id="back">العودة</div>
    </div>
    <div id="msgsec">
        <div id="showmsg">عرض كل الرسائل</div>
        <div id="delmsg">ارسال رسائل</div>
    </div>
    <div id="listmsg">
        <div class="back2">العودة</div>
    </div>
    <div id="div4"><div id="cont">
        <textarea rows="4" cols="50" id="message"></textarea>
        <div id="messageSend">ارسال</div>
        <div class="back2">العودة</div>
        <div id="deletmessage">حذف اخر رسالة</div>
    </div>
    </div>
    <div id="roomsec">
        <div class="back2">العودة</div>
    </div>
    <script src="app.js"></script>
    </body>
</html>
