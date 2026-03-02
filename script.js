getStudents();

//get elements
const form = document.getElementById("student-form");
const infoSection = document.getElementById("main-sec2");
const register = document.getElementById("register");

//add event listener to form
form.addEventListener("submit", function(e){
    e.preventDefault();

    //get values
    const name = document.getElementById("name").value;
    const studentID = document.getElementById("id").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;

    //validations
    if(name == "" || studentID == "" || email == "" || contact == ""){
        alert("Kindly fill all details");
        return;
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert("Name must contain only characters.");
        return;
    }

    if (!/^\d+$/.test(studentID)) {
        alert("Student ID must contain only numbers.");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Invalid email format.");
        return;
    }

    if (!/^\d{10,}$/.test(contact)) {
        alert("Contact must contain at least 10 digits.");
        return;
    }

    let student = [name, studentID, email, contact];
     // Get existing students from localStorage
    let students = getItemLocalStorage();

    // Add new student
    students.push(student);
    // Save  to localStorage
    setItemLocalStorage(students);
    form.reset();

    getStudents();
});

//get students
function getStudents(){
    //get data from local storage
    let students = getItemLocalStorage();   
    const container = document.getElementById("studentContainer");
    container.innerHTML = ""; // Clear previous content

    if (students.length === 0) {
        container.innerHTML = "<p>No students registered yet.</p>";
        return;
    }

    students.forEach((student,index) => {
        const section = document.createElement("section");
        section.classList.add("student-card");

        section.innerHTML = `
            <p><strong>Name:</strong> ${student[0]}</p>
            <p><strong>ID:</strong> ${student[1]}</p>
            <p><strong>Email:</strong> ${student[2]}</p>
            <p><strong>Contact:</strong> ${student[3]}</p>
            <p><button onclick="editStudent('${index}')">Edit</button></p>
            <p><button style="background-color: #1cc88a;" onclick="deleteStudent('${index}')">Delete</button></p>
        `;

        container.appendChild(section);
    });
    //add dynamic height and scroll
     if (students.length > 2) {
        container.style.maxHeight = "400px";
        container.style.overflowY = "auto";
    }
    
}

//delete student
function deleteStudent(index){
    let students = getItemLocalStorage();
     if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        setItemLocalStorage(students);
        getStudents();
     }
}

//edit student
function editStudent(index){
    let students = getItemLocalStorage();
    const student = students[index];
    document.getElementById("name").value = student[0];
    document.getElementById("id").value = student[1];
    document.getElementById("email").value = student[2];
    document.getElementById("contact").value = student[3];

    // Remove the old record
    students.splice(index, 1);
    setItemLocalStorage(students);

    getStudents();

}

//set local storage
function setItemLocalStorage(students) {
     localStorage.setItem("students", JSON.stringify(students));
}

//get local storage
function getItemLocalStorage() {
    return JSON.parse(localStorage.getItem("students")) || [];
}

