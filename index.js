const { Command } = require("commander");
const program = new Command();
const contactsOperations = require("./contacts");

program.description("Contact management system");

program
  .command("list")
  .description("List all contacts")
  .action(async () => {
    console.log(await contactsOperations.listContacts());
  });

program
  .command("get")
  .description("Get a contact by id")
  .requiredOption("-i, --id <id>", "Contact ID")
  .action(async (cmd) => {
    console.log(await contactsOperations.getContactById(cmd.id));
  });

program
  .command("add")
  .description("Add a new contact")
  .requiredOption("-n, --name <name>", "Contact name")
  .option("-e, --email <email>", "Contact email")
  .option("-p, --phone <phone>", "Contact phone")
  .action(async (cmd) => {
    console.log(
      await contactsOperations.addContact(cmd.name, cmd.email, cmd.phone)
    );
  });

program
  .command("remove")
  .description("Remove a contact")
  .requiredOption("-i, --id <id>", "Contact ID")
  .action(async (cmd) => {
    console.log(await contactsOperations.removeContact(cmd.id));
  });

program.parse(process.argv);
