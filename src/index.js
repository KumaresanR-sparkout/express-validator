const express = require("express");
const router = require("./router");
const { ObjectId } = require("mongodb");
const app = express();

app.use(express.json());
app.use("/", router);

if (new ObjectId("6629f97c398f0a63933f1925")) {
    console.log("Valid mongodb id");
}
else {
    console.log("In valid mongodb id");
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});