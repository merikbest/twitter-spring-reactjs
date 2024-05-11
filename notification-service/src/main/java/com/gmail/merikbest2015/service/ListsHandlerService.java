package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.ListsNotificationEvent;
import com.gmail.merikbest2015.event.UpdateListsEvent;
import com.gmail.merikbest2015.model.Lists;

public interface ListsHandlerService {

    void handleUpdateList(UpdateListsEvent listsEvent);

    Lists getOrCreateList(ListsNotificationEvent.Lists lists);
}
