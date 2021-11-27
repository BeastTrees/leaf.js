const express = require('express');
const path = require('path');

const app = express();

app.use("/.leaf_dist", express.static(path.resolve(__dirname, ".leaf_dist")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(process.env.PORT || 25565, () => console.log("Server running..."));