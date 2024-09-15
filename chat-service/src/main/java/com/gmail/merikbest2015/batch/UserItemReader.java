package com.gmail.merikbest2015.batch;

import com.gmail.merikbest2015.commons.event.UpdateUserEvent;
import org.springframework.batch.item.data.AbstractPaginatedDataItemReader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.util.ClassUtils;

import java.util.Iterator;
import java.util.function.Function;

public class UserItemReader extends AbstractPaginatedDataItemReader<UpdateUserEvent> {

    private final Function<Pageable, Page<UpdateUserEvent>> reader;

    public UserItemReader(Function<Pageable, Page<UpdateUserEvent>> reader, int pageSize) {
        this.reader = reader;
        setPageSize(pageSize);
        setName(ClassUtils.getShortName(getClass()));
    }

    @Override
    protected Iterator<UpdateUserEvent> doPageRead() {
        Pageable pageRequest = PageRequest.of(page, pageSize);
        Page<UpdateUserEvent> items = reader.apply(pageRequest);
        return items.getContent().iterator();
    }
}
