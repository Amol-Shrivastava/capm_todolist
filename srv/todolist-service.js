import cds from "@sap/cds/lib/index.js";

export default class TodoService extends cds.ApplicationService {
  async init() {
    await super.init();
  }
}
