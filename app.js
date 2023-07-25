const express = require("express");
const mongoose = require("mongoose");

var countID = 1;
const allEmails = [];
const allnumbers = [];

const app = express();
app.use(express.json());


////////////////////////////////////////////////////////////////////
mongoose.connect("mongodb://127.0.0.1:27017/ContactDB");

const contactSchema = new mongoose.Schema(
  {
    _id: { type: Number, default: 1 },
    phoneNumber: String,
    email: String,
    linkedId: Number,
    linkPrecedence: {
      type: String,
      enum: {
        values: ["secondary", "primary"],
      },
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

Contact.find().then((data) => {
  data.forEach(function (object) {
    allEmails.push(object.email);
    allnumbers.push(object.phoneNumber);
  });
});

async function SAVE(email, number, linkPrecedence, linkedId) {
    contact = new Contact({
      phoneNumber: number,
      email: email,
      linkPrecedence: linkPrecedence,
      linkedId: linkedId,
      _id: countID,
    });
    allEmails.push(email);
    allnumbers.push(number);
    countID++;
    await contact.save();
  };
  
  SAVE(
    (email = "lorraine@hillvalley.edu"),
    (number = "123456"),
    (linkPrecedence = "primary"),
    (linkedId = null)
  );


////////////////////////////////////////////////////////////////////////

async function Create(email, phoneNumber) {
    await Contact.find({ $and: [{ email: email }, { phoneNumber: phoneNumber }] })
      .then(async function (data) {
        // ----------------------------------------------------- duplication -------
        if (data.length != 0) {
        } // data exists so do nothing
  
        //-------------------------------------------------------- new entry --------
        else {
  
          // finding primary id
  
          var idtobekeptprimary = null;
          await Contact.find({ $or: [{ email: email }, { phoneNumber: phoneNumber }] })
            .sort({ createdAt: 1 })
            .then((data) => {
              if (data.length != 0) {
                  if(data[0].linkedId == null) {idtobekeptprimary = data[0]._id}
                else {idtobekeptprimary = data[0].linkedId; }   };
            });

            
        // Updating primary account into secondary ones
        if (allEmails.includes(email) && allnumbers.includes(phoneNumber)) {
            await Contact.updateMany(
              {
                $and: [
                  { $or: [{ email: email }, { phoneNumber: phoneNumber }] },
                  { _id: { $ne: idtobekeptprimary } },
                ],
              },
              { linkPrecedence: "secondary", linkedId: idtobekeptprimary }
            );
          }

        
        // creating new account as secondary account
        else if (
            allEmails.includes(email) ||
            allnumbers.includes(phoneNumber)
          ) {
            console.log("in else if");
            SAVE(
              (email = email),
              (number = phoneNumber),
              (linkPrecedence = "secondary"),
              (linkedId = idtobekeptprimary),
              (_id = countID)
            );
          }

        }
    });
};
  




app.listen(3000 || process.env.PORT, function () {
    console.log("Server started on port 3000.");
  });  