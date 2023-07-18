// app.js
const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results-list');
const companyDetails = document.getElementById('company-details');
const companyName = document.getElementById('company-name');
const companyAddress = document.getElementById('company-address');
const companyContact = document.getElementById('company-contact');
const companyWebsite = document.getElementById('company-website');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value;

  // Clear the previous search results
  resultsList.innerHTML = '';
  companyDetails.classList.add('hidden');

  // Make the search request to the backend API
  fetch(`http://localhost:3000/search?name=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      // Filter the data based on startup names starting with the input alphabet
      const filteredData = data.filter(startup =>
        startup['Startup Name'].toLowerCase().startsWith(searchTerm.toLowerCase())
      );

      // Populate the search results in the list
      filteredData.forEach(startup => {
        const listItem = document.createElement('li');
        listItem.textContent = startup['Startup Name'];
        listItem.addEventListener('click', () => {
          showCompanyDetails(startup);
          clearSearchResults();
        });
        resultsList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});

function showCompanyDetails(company) {
    const excludedFields = ['_id', 'S. No.'];
  
    const companyDetails = document.getElementById('company-details');
    companyDetails.innerHTML = ''; // Clear previous details
  
    for (const field in company) {
      if (!excludedFields.includes(field)) {
        const fieldLabel = document.createElement('p');
        fieldLabel.textContent = field;
        const fieldValue = document.createElement('p');
        fieldValue.textContent = company[field];
        companyDetails.appendChild(fieldLabel);
        companyDetails.appendChild(fieldValue);
      }
    }
    companyDetails.classList.remove('hidden');
  }

function clearSearchResults() {
  resultsList.innerHTML = '';
  searchInput.value = '';
}


// http://localhost:3000/search?name=${searchTerm}