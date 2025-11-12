import cds from "@sap/cds/lib/index.js";

export default class NotificationService extends cds.ApplicationService {
  async init() {
    await super.init();
    // const todoService = await cds.connect.to("TodoService");
    const bus = await cds.connect.to("messaging");
    bus.on("ItemCreated", async (msg) => {
      const { todoListId, itemId } = msg.data;
      console.log(
        ` Notification received for TodoList ${todoListId}, Item ${itemId}`
      );
      await this.notifyUser({ todoListId, itemId });
    });

    this.on("notifyUser", async (req) => {
      const { todoListId, itemId } = req.data;
      console.log(` User notified for TodoList ${todoListId}, Item ${itemId}`);
      return { message: "Notification sent!" };
    });
  }
}
