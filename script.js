// Add this code in your script.js

document.addEventListener('DOMContentLoaded', function () {
    loadDonors();
});

function loadDonors() {
    // Assuming 'donors.xlsx' is the name of your Excel file
    const excelFile = 'donors.xlsx';

    // Load the Excel file using SheetJS library
    fetch(excelFile)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet data to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Display donors on the webpage
            displayDonors(jsonData);
        })
        .catch(error => {
            console.error('Error loading Excel file:', error);
        });
}

function displayDonors(donors) {
    const donorsList = document.getElementById('donors-list');

    donors.forEach(donor => {
        const listItem = document.createElement('li');
        listItem.textContent = `${donor.Name}: ${donor.Amount} INR`;
        donorsList.appendChild(listItem);
    });
}
