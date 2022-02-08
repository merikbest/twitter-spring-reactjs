package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface ImageProjection {
//    @Value("#{target.Object.idS}")
    Long getId();
    String getSrc();
}
