//================ SELECT ELEMENTS ================//

const candidateId = document.getElementById("candidateId");
const candidateName = document.getElementById("candidateName");
const candidateAge = document.getElementById("candidateAge");
const candidateEmail = document.getElementById("candidateEmail");
const qualification = document.getElementById("qualification");
const candidateSkill = document.getElementById("candidateSkill");

const registerCandidate = document.getElementById("registerCandidate");
const searchCandidate = document.getElementById("searchCandidate");

const candidateGrid = document.querySelector(".candidate-grid");

const confirmApplication = document.getElementById("confirmApplication");

const themeToggle = document.getElementById("themeToggle");

//================ ARRAY =================//

let candidates = [];

//================ REGISTER =================//

registerCandidate.addEventListener("click", addCandidate);

function addCandidate(){

    try{

        if(candidateId.value==""){

            throw "Enter Candidate ID";

        }

        if(candidateName.value==""){

            throw "Enter Candidate Name";

        }

        if(candidateAge.value==""){

            throw "Enter Age";

        }

        if(candidateEmail.value==""){

            throw "Enter Email";

        }

        if(qualification.value=="Select Qualification"){

            throw "Select Qualification";

        }

        let status;

        if(Number(candidateAge.value)>=18){

            status="Eligible";

        }

        else{

            status="Not Eligible";

        }

        const student={

            id:candidateId.value,

            name:candidateName.value,

            age:candidateAge.value,

            email:candidateEmail.value,

            qualification:qualification.value,

            skill:candidateSkill.value,

            status:status

        };

        candidates.push(student);

        displayCandidates();

        updateSummary(student);

        resetForm();

        alert("Candidate Registered Successfully");

    }

    catch(error){

        alert(error);

    }

}

//================ DISPLAY =================//

function displayCandidates(){

    candidateGrid.innerHTML="";

    candidates.forEach(function(student,index){

        candidateGrid.innerHTML+=`

        <div class="candidate-card">

            <h2>${student.name}</h2>

            <p><b>ID :</b> ${student.id}</p>

            <p><b>Age :</b> ${student.age}</p>

            <p><b>Qualification :</b> ${student.qualification}</p>

            <p><b>Skill :</b> ${student.skill}</p>

            <p class="${student.status=="Eligible" ? "eligible":"not-eligible"}">

                ${student.status}

            </p>

            <div class="card-btns">

                <button class="delete-btn"

                onclick="deleteCandidate(${index})">

                Delete

                </button>

            </div>

        </div>

        `;

    });

}

//================ DELETE =================//

function deleteCandidate(index){

    candidates.splice(index,1);

    displayCandidates();

}

//================ SEARCH =================//

searchCandidate.addEventListener("keyup",searchData);

function searchData(){

    const value=searchCandidate.value.toLowerCase();

    const cards=document.querySelectorAll(".candidate-card");

    cards.forEach(function(card){

        const name=card.querySelector("h2").textContent.toLowerCase();

        if(name.includes(value)){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

}

//================ SUMMARY =================//

function updateSummary(student){

    document.getElementById("summaryName").textContent=student.name;

    document.getElementById("summaryQualification").textContent=student.qualification;

    document.getElementById("summaryEligibility").textContent=student.status;

    document.getElementById("summaryDate").textContent="20 July 2026";

}

//================ RESET =================//

function resetForm(){

    candidateId.value="";

    candidateName.value="";

    candidateAge.value="";

    candidateEmail.value="";

    qualification.selectedIndex=0;

    candidateSkill.value="";

}

//================ CONFIRM =================//

confirmApplication.addEventListener("click",function(){

    if(candidates.length==0){

        alert("Register Candidate First");

        return;

    }

    alert("Application Submitted Successfully");

});

//================ THEME =================//

themeToggle.addEventListener("click",function(){

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        themeToggle.classList.remove("fa-moon");

        themeToggle.classList.add("fa-sun");

    }

    else{

        themeToggle.classList.remove("fa-sun");

        themeToggle.classList.add("fa-moon");

    }

});

//================ TIMER =================//

let totalTime=300;

const minutes=document.getElementById("minutes");

const seconds=document.getElementById("seconds");

function startTimer(){

    let min=Math.floor(totalTime/60);

    let sec=totalTime%60;

    minutes.textContent=String(min).padStart(2,"0");

    seconds.textContent=String(sec).padStart(2,"0");

    if(totalTime<=0){

        clearInterval(timer);

        alert("Registration Closed");

        return;

    }

    totalTime--;

}

startTimer();

const timer=setInterval(startTimer,1000);