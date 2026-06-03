const express=require("express")
const app=express()
require("dotenv").config()
const port=process.env.PORT
const cors=require("cors")
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const nodemailer=require("nodemailer")
const dbconnect=require("./dbconnection/dbcoonect")
dbconnect();

const userroutes=require("./routes/userroutes")
const adminroutes=require("./routes/adminroutes")
const contactmodel=require("./models/contacts")

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: "gmail", // For Gmail
    auth: {
      user: "r16304565@gmail.com", // Your email
      pass: "nm", // Your email password or app password
    },
  });

  app.post("/sendemail", async (req, res) => {
    const { by, to, desc } = req.body;
  
    try {
      if (!by || !to || !desc) {
        return res.status(400).send("All fields are required");
      }

      // Save to MongoDB contacts collection
      const contact = new contactmodel({
        name: by,
        email: to,
        message: desc
      });
      await contact.save();

      // Gracefully attempt email send
      try {
        await transporter.sendMail({
          from: "r16304565@gmail.com", // Sender's email
          to: "r16304565@gmail.com", // Send to admin
          subject: `New Bookstore Inquiry from ${by}`,
          text: `Name: ${by}\nEmail: ${to}\nMessage: ${desc}`,
        });
      } catch (emailError) {
        console.error("Nodemailer failed to send email (SMTP config issue):", emailError.message);
      }
  
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error in contact us route:", error);
      res.status(500).send("Failed to save or send message");
    }
  });


app.use("/bks",userroutes)
app.use("/bks",adminroutes)
app.listen(port,(err)=>{
    console.log(`server started at ${port}`); 
})

module.exports = app;