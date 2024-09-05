document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/assets');
        const data = await response.json();

        const tableBody = document.querySelector('#assetsTable tbody');
        tableBody.innerHTML = '';

        data.forEach(asset => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${asset.name}</td>
                <td>${asset.asset_type_name}</td>
                <td>${asset.location_id ? asset.location_id : 'N/A'}</td>
                <td>${new Date(asset.created_at).toLocaleString()}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching assets:', error);
    }
});
