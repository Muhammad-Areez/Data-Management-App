document.addEventListener('DOMContentLoaded', function () {
    const dataForm = document.getElementById('data-form');
    const dataTable = document.getElementById('data-table');
    const tbody = dataTable.querySelector('tbody');

    // Load data from local storage
    const storedData = JSON.parse(localStorage.getItem('data')) || [];

    // Function to update the table with data
    function updateTable() {
        tbody.innerHTML = ''; // Clear the table

        for (const data of storedData) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>
                    <button class="delete-btn">Delete</button>
                    <button class="edit-btn">Edit</button>
                </td>
            `;
            tbody.appendChild(newRow);

            // Attach event listeners for delete and edit buttons
            const deleteBtn = newRow.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function () {
                const dataIndex = storedData.findIndex((item) => item.name === data.name && item.email === data.email);
                if (dataIndex !== -1) {
                    storedData.splice(dataIndex, 1);
                    updateTable();
                    saveDataToLocalStorage();
                }
            });

            const editBtn = newRow.querySelector('.edit-btn');
            editBtn.addEventListener('click', function () {
                const newName = prompt('Enter the new name:', data.name);
                const newEmail = prompt('Enter the new email:', data.email);

                if (newName !== null && newEmail !== null) {
                    data.name = newName;
                    data.email = newEmail;
                    updateTable();
                    saveDataToLocalStorage();
                }
            });
        }
    }

    // Function to save data to local storage
    function saveDataToLocalStorage() {
        localStorage.setItem('data', JSON.stringify(storedData));
    }

    // Initial table population
    updateTable();

    dataForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (name && email) {
            // Add data to the storedData array
            storedData.push({ name, email });
            saveDataToLocalStorage();
            updateTable();

            // Clear the form fields
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
        }
    });
});
