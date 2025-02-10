require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const galeryRoute = require('./routes/galery');
const kelasRoute = require('./routes/kelas');
const siswaRoute = require('./routes/siswa');
const guruRoute = require('./routes/guru');
const absenRoute = require('./routes/daftar_hadir');
const userRoute = require('./routes/login');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const imgPath = path.resolve(__dirname, "public/img");
console.log("Serving static files from:", imgPath);
app.use("/img", express.static(imgPath));
app.use('/api', galeryRoute, kelasRoute, siswaRoute, guruRoute, absenRoute, userRoute );

app.get('/', (req, res) => {
    res.send({ message: 'API is running...' });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
