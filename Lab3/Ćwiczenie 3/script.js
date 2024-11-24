
const filterInput = document.getElementById('filter-input');
const sortSelect = document.getElementById('sort-select');
const dataTable = document.getElementById('data-table');

let originalData = [];
let filteredData = [];


fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
        originalData = data.products.slice(0, 30);
        filteredData = [...originalData];
        displayData(filteredData);
    })
    .catch(error => console.error('Błąd podczas pobierania danych:', error));


function displayData(data) {
    dataTable.innerHTML = '';
    data.forEach(item => {
        const row = `
            <tr>
                <td><img src="${item.thumbnail}" alt="${item.title}"></td>
                <td>${item.title}</td>
                <td>${item.description}</td>
            </tr>
        `;
        dataTable.innerHTML += row;
    });
}


filterInput.addEventListener('input', () => {
    const query = filterInput.value.toLowerCase();
    filteredData = originalData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
    applySorting();
});


sortSelect.addEventListener('change', () => {
    applySorting();
});

function applySorting() {
    const sortOption = sortSelect.value;

    if (sortOption === 'ascending') {
        filteredData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'descending') {
        filteredData.sort((a, b) => b.title.localeCompare(a.title));
    } else {
        filteredData = [...originalData];
    }

    displayData(filteredData);
}
