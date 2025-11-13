using {productivityModule as prodM} from '../db/schema.cds';

service TodoService {
    entity Todolists     as projection on prodM.TodoListHdr
        actions {
            action createListItem(title: String, description: String, dueDate: Date) returns Todolists;
        };

    entity TodoListItems as projection on prodM.TodoListItems;

    action createList(title: String, description: String) returns Todolists;

}
