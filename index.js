
import { addContact, listContacts, removeContact, getContactById } from "./contacts.js";
 import { Command } from "commander";


 const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name: contactName, email, phone }) {
  switch (action) {
    case "list":
          const contactsList = await listContacts();
          console.table(contactsList);
      break;

    case "get":
          const contactFound = await getContactById(id);
          console.log(contactFound);
      break;

    case "add":
          const newContacstList = await addContact(contactName, email, phone);
          console.log(newContacstList);
          break;
   

    case "remove":
          const shortList = await removeContact(id);
          console.table(shortList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
console.log("Parsed arguments:", argv);