import cds from "@sap/cds/lib/index.js";

export default class TodoService extends cds.ApplicationService {
  async init() {
    const { todolists, todolistItems } = this.entities;

    this.before("createList", async (req) => {
      debugger;
    });

    this.before("INSERT", todolists, async (req) => {
      const { title, description } = req.data;

      if (!title || !description)
        return req.error(
          400,
          cds.i18n.labels.at("MANDATORY_FIELDS_MISSING"),
          cds.i18n.labels.at("MANDATORY_FIELDS_MISSING_MSG")
        );

      return { title, description };
    });

    this.on("INSERT", todolists, async (req) => {
      const { title, description } = req.data;
      let payloadObj = {
        todoListId: cds.utils.uuid(),
        title,
        description,
        status: "Open",
        createdBy: req.user.id || "Amol",
        createdAt: new Date().toISOString(),
        updatedBy: req.user.id || "Amol",
        updatedAt: new Date().toISOString(),
      };

      await INSERT.into(todolists, [payloadObj]);

      return {
        code: cds.i18n.labels.at("SUCCESSFUL_SUBMISSION_CODE"),
        message: cds.i18n.labels.at("SUCCESSFUL_SUBMISSION_MSG"),
        body: payloadObj,
      };
    });

    this.before("addItem", async (req) => {
      const { todoListId, title, description } = req.data;
      if (!todoListId || !title || !description)
        return req.error(
          400,
          cds.i18n.labels.at("MANDATORY_FIELDS_MISSING"),
          cds.i18n.labels.at("MANDATORY_FIELDS_MISSING_MSG")
        );
    });

    this.on("addItem", async (req) => {
      const { todoListId, title, description } = req.data;

      const todo = await SELECT.one.from(todolists).where({ todoListId });

      if (!todo)
        return req.error(
          404,
          cds.i18n.labels.at("NOT_FOUND_LABEL"),
          cds.i18n.labels.at("NOT_FOUND_LABEL_MSG")
        );

      let item = {
        todoListItemId: cds.utils.uuid(),
        todolistId: { todoListId },
        title,
        description,
        status: "Open",
        createdBy: req.user.id || "Amol",
        createdAt: new Date().toISOString(),
        updatedBy: req.user.id || "Amol",
        updatedAt: new Date().toISOString(),
      };
      await INSERT.into(todolistItems).entries(item);

      return {
        ...todo,
        items: item,
      };
    });

    await super.init();
  }
}
