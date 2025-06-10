// Select the registration form and table body where student rows will be displayed
const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");

// When the page loads, fetch students from localStorage and render them
window.onload = () => {
  // Get student array from localStorage or initialize empty array if none
  const students = JSON.parse(localStorage.getItem("students")) || [];
  // Render each student record as a row in the table
  students.forEach(student => insertRow(student));
};

// Listen to form submit event to add or update student records
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission reload

  // Get trimmed values from form inputs
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  // Create student object from inputs
  const student = { name, studentId, email, contact };

  // Check if we are editing an existing record or adding a new one
  const isEdit = form.dataset.editing === "true";
  if (isEdit) {
    // If editing, update the student at the stored index
    const index = form.dataset.index;
    updateStudent(index, student);

    // Reset editing flags and form button text
    form.dataset.editing = "false";
    form.dataset.index = "";
    form.querySelector("button").textContent = "Register";
  } else {
    // Add new student record
    addStudent(student);
  }

  // Clear the form inputs for next entry
  form.reset();
});

// Add new student: store in localStorage and display in table
function addStudent(student) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student); // Add new student object
  localStorage.setItem("students", JSON.stringify(students)); // Save updated array
  insertRow(student); // Add a new row in the table for this student
}

// Create and insert a new row in the student table for a student object
function insertRow(student) {
  const row = document.createElement("tr");

  // Create table cells with student data and action buttons
  row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.studentId}</td>
    <td>${student.email}</td>
    <td>${student.contact}</td>
    <td>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;

  // Add click listener for "Edit" button to load data back into form for editing
  row.querySelector(".edit-btn").addEventListener("click", () => {
    form.dataset.editing = "true"; // Set editing flag
    form.dataset.index = getStudentIndex(student); // Store index for update
    // Populate form inputs with selected student data
    form.name.value = student.name;
    form.studentId.value = student.studentId;
    form.email.value = student.email;
    form.contact.value = student.contact;
    form.querySelector("button").textContent = "Update"; // Change button label
  });

  // Add click listener for "Delete" button to remove student
  row.querySelector(".delete-btn").addEventListener("click", () => {
    if (confirm("Delete this student?")) {
      deleteStudent(student); // Remove from localStorage
      row.remove(); // Remove from table UI
    }
  });

  // Append the new row to the table body
  tableBody.appendChild(row);
}

// Find the index of a student object in localStorage by matching key properties
function getStudentIndex(student) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  return students.findIndex(
    (s) =>
      s.studentId === student.studentId &&
      s.email === student.email &&
      s.contact === student.contact
  );
}

// Update an existing student record in localStorage and refresh table UI
function updateStudent(index, updatedStudent) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students[index] = updatedStudent; // Update at index with new data
  localStorage.setItem("students", JSON.stringify(students)); // Save changes

  // Clear current table rows and re-render all students
  tableBody.innerHTML = "";
  students.forEach(student => insertRow(student));
}

// Delete a student from localStorage by filtering out the matching record
function deleteStudent(student) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students = students.filter(
    (s) =>
      !(s.studentId === student.studentId &&
        s.email === student.email &&
        s.contact === student.contact)
  );
  localStorage.setItem("students", JSON.stringify(students)); // Save updated list
}
//footer
// script.js
document.getElementById('year').textContent = new Date().getFullYear();
