namespace productivityModule;


entity TodoList {
    key todoListId  : String(300);
        title       : String(200);
        description : String(400);
        status      : Statuses;
        items       : Association to many TodoListItems
                          on items.todolistId = $self;
        createdBy   : String(100);
        createdAt   : Timestamp;
        updatedBy   : String(100);
        updatedAt   : Timestamp;
}

entity TodoListItems {
    key todoListItemId : String(300);
        todolistId     : Association to TodoList;
        title          : String(200);
        description    : String(400);
        status         : Statuses;
        createdBy      : String(100);
        createdAt      : Timestamp;
        updatedBy      : String(100);
        updatedAt      : Timestamp;
}

type Statuses : String enum {
    Open;
    Completed;
    Discarded
};
