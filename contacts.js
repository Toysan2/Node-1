const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Dodanie wymaganego modułu UUID

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

// Usuwanie kontaktu z dodatkową walidacją
async function removeContact(contactId) {
  try {
    const contacts = await readContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      throw new Error("Contact with provided ID does not exist");
    }
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    console.error("Could not remove contact", error);
  }
}

// Dodawanie nowego kontaktu z UUID i walidacją
async function addContact(name, email, phone) {
  try {
    if (!name || !email || !phone) {
      throw new Error("All fields (name, email, phone) are required");
    }
    // Dodatkowa walidacja dla email i telefonu może zostać tu dodana

    const contacts = await readContacts();
    const newContact = { id: uuidv4(), name, email, phone }; // Użycie UUID
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
