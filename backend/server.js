import express from "express";
import cors from "cors";
import {
  addContact,
  contacts,
  updateContact,
  deleteContact,
} from "./model/ContactsModel.js";

const PORT = 3001;
const filePath = "./data/contacts.json";

const app = express();

// ! MIDDLEWARE
app.use(express.json());
app.use(cors());

// ! ALLE CONTACTS
app.get("/api/contacts", (req, res) => {
  console.log(contacts);
  res.send(contacts);
});

// ! NEUER CONTACT
app.post("/api/contacts", async (req, res) => {
  console.log(req.body);
  const contact = req.body;
  const newContact = await addContact(contact);
  res.send(newContact);
});

// ! CONTACT BEARBEITEN
app.put("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const contact = req.body;
  const updatedContact = await updateContact(id, contact);
  res.send(updatedContact);
});

// ! CONTACT LÖSCHEN
app.delete("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  deleteContact(id);
  res.send("Todo wurde gelöscht");
});

// ! PORT LISTEN
app.listen(PORT, () => {
  console.log(`Server ist am laufen mit diesem Port : ${PORT}`);
});
