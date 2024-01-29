const contactsOperations = require("./contacts");

async function main() {
  try {
    console.log("Listing all contacts:");
    console.log(await contactsOperations.listContacts());

    console.log("\nGetting contact by ID:");
    console.log(
      await contactsOperations.getContactById("AeHIrLTr6JkxGE6SN-0Rw")
    );

    console.log("\nAdding a new contact:");
    const newContact = await contactsOperations.addContact(
      "Jan Kowalski",
      "jan@example.com",
      "123-456-789"
    );
    console.log(newContact);

    console.log("\nRemoving a contact:");
    console.log(
      await contactsOperations.removeContact("AeHIrLTr6JkxGE6SN-0Rw")
    );
  } catch (error) {
    console.error(error);
  }
}

main();
