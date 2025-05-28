const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Resend } = require("resend");

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.get("/", (req, res) => {
    res.send({ message: "Welcome to the email server!" });
});

app.get("/api/send", async (req, res) => {

         const {data, error} = await resend.emails.send({
            from: "info@dbereznak.dev",
            to: "dbereznak@gmail.com",
            subject: `New message from ${req.query.name}`,
            html: `<h2>email: ${req.query.email}<h2><p>${req.query.message}</p>`
        });

        if (error) {
            console.error("Error sending email:", error);
            return res.status(400).json({ error });
        }
        
        res.status(200).json({ data });
});
app.listen(3000, () => {
    console.log("Email server is running on port 3000");
});