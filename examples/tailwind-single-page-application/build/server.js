const express = require('express');
const path = require('path');

const port = process.env.PORT || 25565

const app = express();

app.use("/.leaf_dist", express.static(path.resolve(__dirname, ".leaf_dist")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(port, () => console.log(`LISTENING PORT ${port}`));