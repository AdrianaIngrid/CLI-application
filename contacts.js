import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.error("Error reading contacts file!", error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactFound = contacts.find((contact) => contact.id === contactId);
    if (!contactFound) {
      console.log(`Contact with ID ${contactId} not found`);
      return;
    }
    console.log("Contact found is:", contactFound);
  } catch (error) {
    console.error("Error reading file!", error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const indexContact = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (indexContact === -1) {
      console.log(`Contact with ID ${contactId} not found`);
      return;
    }
    const [contactRemoved] = contacts.splice(indexContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("The contact is removed:", contactRemoved);
  } catch (error) {
    console.error("Error handling contacts file!", error);
  }
}

async function addContact(name, email, phone) {
  if (!name || !email || !phone) {
    console.error("You need to provide a name, email, and phone.");
    return;
  }
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("The contact is added!", newContact);
  } catch (error) {
    console.error("Error reading contacts file!", error);
  }
}

export { listContacts, addContact, removeContact, getContactById };
