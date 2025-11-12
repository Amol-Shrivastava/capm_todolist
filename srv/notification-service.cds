using {productivityModule as prodMod} from '../db/schema';

service NotificationService @(path: '/notify') {
    action notifyUser(todoListId: String, itemId: String);
}
