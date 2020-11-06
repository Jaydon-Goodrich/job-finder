const express = require('express');


const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send("Hello Job Finder!")
})

app.listen(PORT, () => {
    console.log(`Now listening on http://localhost:${PORT}`);
})