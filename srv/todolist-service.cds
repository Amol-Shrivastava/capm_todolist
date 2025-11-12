using {productivityModule as prodM} from '../db/schema';

service TodoListService @(path: '/todos') {
    entity todolists     as projection on prodM.TodoList;
    entity todolistItems as projection on prodM.TodoListItems;

    action createList(todo: todolists)                                     returns todolists;
    action addItem(todoListId: String, title: String, description: String) returns todolists;
}
