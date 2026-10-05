const API_URL = "https://691f50aabb52a1db22c144f0.mockapi.io/API/V1/users";


// FETCH DATA ON PAGE LOAD


window.onload = fetchCandidates ;

async function fetchCandidates() {
    const tableBody = document.querySelector(".data-table tbody");
    tableBody.innerHTML = "";

    try {//هنا بنبدأ نجيب الداتا
        const response = await fetch(API_URL);//بيتبعت زي طلب ومستنيين الرد من ال API
        const data = await response.json();

        data.forEach(user => {  //بيبدأ هنا يلف على كل row علشان يجيب الداتا بتاعتها
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.NAME}</td>
                <td>${user.AGE}</td>
                <td>${user.GENDER}</td>
                <td>${user.COMPETITIon}</td>
                <td>${user.EMAIL}</td>
                <td>
                    <button onclick="editCandidate(this)" class="edit">Edit</button>
                    <button onclick="deleteCandidateAPI('${user.id}', this)" class="delete">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);  //وهنا هيعرض ال roe كامل
        });
    } catch(err) {
        console.error("API fetch error:", err);//في حالة ال حصل مشكلة 
    }
};

//Edit

let currentRow = null; //هنعمل زي row افتراضي فاضي

function editCandidate(btn) {
    currentRow = btn.parentElement.parentElement; //حسب ال raw اللي اليوزر هيضغط عليه edit هيبدأ يجيب البيانات
    
    document.getElementById("editNameInput").value = currentRow.cells[0].innerText;
    document.getElementById("editAgeInput").value = currentRow.cells[1].innerText;
    document.getElementById("editGenderInput").value = currentRow.cells[2].innerText;
    document.getElementById("editCompetitionInput").value = currentRow.cells[3].innerText;
    

    document.getElementById("editModal").style.display = "flex";//المودال اللي هيظهر فيه كل حاجة هنظهره
}

function saveChanges() {
    if (currentRow) { //هنا لما كل حاجة تظهر اليوزر هبلدأ يعدل على اللي هو عاوزه

        const name = document.getElementById("editNameInput").value.trim();
        const age = document.getElementById("editAgeInput").value.trim();
        const gender = document.getElementById("editGenderInput").value;
        const competition = document.getElementById("editCompetitionInput").value.trim();



//لو مسح كل حاجة ومش عمل edit تظهرله مسدج error
if (!name || !age || !gender || !competition || !email) {
        showtoast("⚠️error: Please fill in all fields.")
        return false;
    }

//لو دخل قيمة غير string    
    if(!isNaN(name)){
        showtoast("⚠️error: Name must be text, not numbers");
        return;
    }

    //لو ال age أقل من 0
    if(age<=0){
        showtoast("⚠️error: invalid number the age should be positive");
        return;
    }
//لو دخل قيمة غير ال string
    if(!isNaN(competition)){
        showtoast("⚠️error: competition must be text, not numbers");
        return
    }
    
//بعد ما كل حاجة تمام هيبدأ يحط العناصر الجديدة مكانها ولو في قديم يسيبه
        currentRow.cells[0].innerText = document.getElementById("editNameInput").value;
        currentRow.cells[1].innerText = document.getElementById("editAgeInput").value;
        currentRow.cells[2].innerText = document.getElementById("editGenderInput").value;
        currentRow.cells[3].innerText = document.getElementById("editCompetitionInput").value;
        
        showtoast("success: Candidate updated successfully!");//هتظهر رسالة النجاح
        closeModal();//هيقفل المودال
    }
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}






// DELETE


let candidateToDelete = null; 

function deleteCandidateAPI(id, btn) {//هنا حسب raw اللي هيضغط عليه الوزر
    candidateToDelete = { id, btn };
    document.getElementById("deleteModal").style.display = "flex";//المودال بتاع ال delet هيظهر
}

document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
    const { id, btn } = candidateToDelete;
    try {//هنا في حالة ان اليوزر اختار هيبدا يبعت ريكويست لل API 
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        btn.parentElement.parentElement.remove();//هنا عمل remove خلاص
        showtoast("success: Candidate deleted successfully!");//رسالة النجاح
    } catch (err) {
        showtoast("⚠️error: Failed to delete candidate.");//في حالة انه فشل
    }
    document.getElementById("deleteModal").style.display = "none";//يقفل المودال
});

document.getElementById("cancelDeleteBtn").addEventListener("click", () => {//لما يكنسل ال delete يقفل المودال خالص
    document.getElementById("deleteModal").style.display = "none";
    showtoast("Deletion canceled.");
});
    


// ADD

//هنا كنت بظبطت جزء الايميل الأول في ال add
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const toastBox=document.getElementById("toastBox");


function showtoast(msg){
    let toast=document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML=msg;
    toastBox.appendChild(toast);

if(msg.includes('error')){
 toast.classList.add('error');
 }
    if(msg.includes('success')){
 toast.classList.add('success');
 }
 setTimeout(()=>{ 
   toast.remove();
   },6000);
    }


function validateEmail(email) {
if (!email.endsWith("@gmail.com")) {
        return false;
    }
    return true;
}    


//هنا هنبدا نعرف

const modal = document.getElementById("modal"); 
const modalTitle = document.getElementById("modal-title");
const addBtn = document.querySelector("#add-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const saveBtn = document.querySelector("#save-btn");
const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const genderInput = document.querySelector("#gender");
const competitionInput = document.querySelector("#competition");


//لما اضغط على add يحصل كالتالي
addBtn.addEventListener("click", function() {  
   modal.style.display = "flex";
   modalTitle.textContent = "Add New Candidate";
});


window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};

//هنا لو ضغط cancel
cancelBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

//طيب لو ضغط save
saveBtn.addEventListener("click", async function(e) {
    e.preventDefault();//استنى لما تاخد الداتا من اليوزر
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const gender = genderInput.value;
    const competition = competitionInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !age || !gender || !competition || !email) {
        showtoast("⚠️error: Please fill in all fields.")
        return;
    }


    if(!isNaN(name)){
    showtoast("⚠️error: Name must be text, not numbers");
    return;
}
   

    if(age<=0){
        showtoast("⚠️error: invalid number the age should be positive");
        return;
    }
   

    if(!validateEmail(email)){
        showtoast("⚠️error: Email must end with @gmail.com");
        return ;
    }


    if(!isNaN(competition)){
        showtoast("⚠️error: competition must be text, not numbers");
        return;
    }
    
    //وهنا هيظبط الأماكن
    const newCandidate = {
        NAME: name,
        AGE: age,
        GENDER: gender,
        COMPETITIon: competition,
        EMAIL: email,
    };
    try { 
        await fetch(API_URL, {//هيبعت ريكويست لل API 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
     },
            body: JSON.stringify(newCandidate)
    });


    await fetchCandidates();//لو اتنفذ تمام يظهر المسدج
    showtoast("success: Candidate added successfully!");

//ويرجع القيم ل none
        nameInput.value = "";
        ageInput.value = "";
        genderInput.value = "";
        competitionInput.value = "";
        emailInput.value = "";
    modal.style.display = "none";
}     
  catch (err) {
        console.error("Error adding candidate:", err);
    } 
})