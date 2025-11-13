namespace productivityModule;

using {
    cuid,
    managed
} from '@sap/cds/common';

/**
 * aspect to maintain Extensibility
 */
aspect Extensible {
    /**
     * Add extensible fields here
     */
}

/**
 * Status Entity
 */
entity StatusCatalog {
    code        : String(50);
    description : String(255);
}

/**
 * Todolist Header Entity
 */

// @cds.oData.binding-pattern: 'v1'
// @cds.extensible
entity TodoListHdr : cuid, managed, Extensible {
    title       : localized String(100);
    description : localized String(255);
    status      : Association to StatusCatalog;
    items       : Composition of many TodoListItems
                      on items.parent = $self;
}

/**
 * Todolist Item entity
 */

entity TodoListItems : cuid, managed, Extensible {
    parent      : Association to TodoListHdr;
    title       : localized String(200);
    description : localized String(400);
    status      : Association to StatusCatalog;
    dueDate     : Date;
}
