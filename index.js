const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const API_KEY = process.env.API_KEY; // 환경 변수로 API 키 설정
const DOMAIN = process.env.DOMAIN; // 환경 변수로 도메인 설정

async function fetchAllAssets() {
    let allAssets = [];
    let page = 1;
    let morePagesAvailable = true;

    while (morePagesAvailable) {
        try {
            const response = await axios.get(`https://${DOMAIN}.freshservice.com/api/v2/assets`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(API_KEY + ':X').toString('base64')}`
                },
                params: {
                    page: page,
                    per_page: 100  // 페이지당 100개의 자산을 가져옵니다.
                }
            });

            const assets = response.data.assets;
            allAssets = allAssets.concat(assets);

            if (assets.length < 100) {
                morePagesAvailable = false;
            } else {
                page++;
            }
        } catch (error) {
            console.error('Error fetching assets:', error);
            morePagesAvailable = false;
        }
    }

    return allAssets;
}

app.get('/api/assets', async (req, res) => {
    try {
        const allAssets = await fetchAllAssets();
        res.json({ assets: allAssets });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assets' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

