const fs = require("fs").promises;
const path = require("path");

// Definiowanie ścieżki do pliku contacts.json
const contactsPath = path.join(__dirname, "db", "contacts.json");

// Funkcja do odczytu kontaktów z pliku
async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

// Listowanie wszystkich kontaktów
async function listContacts() {
  try {
    return await readContacts();
  } catch (error) {
    console.error("Could not list contacts", error);
  }
}

// Pobieranie kontaktu po ID
async function getContactById(contactId) {
  try {
    const contacts = await readContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.error("Could not find contact", error);
  }
}

// Usuwanie kontaktu
async function removeContact(contactId) {
  try {
    const contacts = await readContacts();
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return newContacts;
  } catch (error) {
    console.error("Could not remove contact", error);
  }
}

// Dodawanie nowego kontaktu
async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts();
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Could not add new contact", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
