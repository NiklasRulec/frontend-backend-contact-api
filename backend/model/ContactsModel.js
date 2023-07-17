import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const filePath = "./data/contacts.json";

export let contacts = [];

const _setUp = async () => {
  try {
    const buffer = await fs.readFile(filePath);
    contacts = JSON.parse(buffer);
  } catch (err) {
    console.log("Error reading contacts from file", err);
  }
};

_setUp();

const _saveContact = async () => {
  try {
    await fs.writeFile(filePath, JSON.stringify(contacts));
  } catch (err) {
    console.log("Error saving contacts to file", err);
  }
};

export const addContact = async (contact) => {
  console.log(contact);
  const newContact = { ...contact, id: uuidv4() };
  contacts.push(newContact);
  await _saveContact();
  return newContact;
};

const _findEntryIndex = (id) => {
  return contacts.findIndex((contact) => contact.id === id);
};

export const updateContact = async (id, contact) => {
  const contactIndex = _findEntryIndex(id);
  if (contactIndex !== -1) {
    const updateContact = { ...contacts[contactIndex], ...contact };
    contacts[contactIndex] = updateContact;
    await _saveContact();
    return updateContact;
  }
  return null;
};

export const deleteContact = async (id) => {
  const contactIndex = _findEntryIndex(id);
  if (contactIndex !== -1) {
    contacts.splice(contactIndex, 1);
    await _saveContact();
    return true;
  }
  return false;
};
