document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/assets');
        const data = await response.json();

        console.log(data); // 데이터 출력 확인

        const tableBody = document.querySelector('#assetsTable tbody');
        tableBody.innerHTML = '';

        // 자산 데이터 출력
        data.assets.forEach(asset => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${asset.name || 'N/A'}</td>  <!-- 자산 이름이 없으면 N/A -->
                <td>${asset.asset_type_name || 'N/A'}</td> <!-- 자산 타입이 없으면 N/A -->
                <td>${asset.location_id || 'N/A'}</td> <!-- 자산 위치가 없으면 N/A -->
                <td>${new Date(asset.created_at).toLocaleDateString() || 'N/A'}</td> <!-- 생성일이 없으면 N/A -->
                <td>${asset.asset_state || 'N/A'}</td> <!-- 자산 상태가 없으면 N/A -->
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching assets:', error);
    }
});

function filterAssets() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const tableRows = document.querySelectorAll('#assetsTable tbody tr');
    
    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let match = false;

        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(searchInput)) {
                match = true;
            }
        });

        row.style.display = match ? '' : 'none';  // 일치하는 행만 표시
    });
}
