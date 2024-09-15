package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.commons.event.ListsNotificationDto;
import com.gmail.merikbest2015.commons.event.UpdateListsEvent;
import com.gmail.merikbest2015.model.Lists;

public interface ListsHandlerService {

    void handleUpdateList(UpdateListsEvent listsEvent);

    Lists getOrCreateList(ListsNotificationDto lists);
}
