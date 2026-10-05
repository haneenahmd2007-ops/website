function toggleMenu(){
    const menu=document.getElementById("menu");
    if (menu.style.display==="block"){    //لو المنيو ظاهرة ف لما اضغط عليها تختفي
        menu.style.display="none";
    }else{
        menu.style.display="block";      //لو مختفية ف لما اضغط عليها تظهر
    }
}

const form=document.getElementById("log")      //جيب كل حاجة هتتكتب في الفورم
const firstname=document.getElementById("firstname");     //خد الانبت بتاع اايوزر
const lastname= document.getElementById("lastname");
const email=document.getElementById("email");

if(localStorage.getItem("firstname")){        //لو اليوزر كات مدخل بياناته رجعها
    firstname.value=localStorage.getItem("firstname");
}
if(localStorage.getItem("lastname")){
    lastname.value=localStorage.getItem("lastname");
}
if(localStorage.getItem("email")){
    email.value=localStorage.getItem("email");
}

form.addEventListener("submit",function(e){   // لما اليوزر يضغط على الزر ينفذ اللي جوا
    e.preventDefault();    //اصبر مش تعمل حاجة
    localStorage.setItem("firstname", firstname.value);     //خد البيانات الجديدة من اليوزر
    localStorage.setItem("lastname", lastname.value);
    localStorage.setItem("email", email.value)
    alert("logIn Data Saved!")        //مسدج تدل على حفظ البيانات
    window.location.href="future_passport.html";    //يرجع للصفحة ديي تاني
});