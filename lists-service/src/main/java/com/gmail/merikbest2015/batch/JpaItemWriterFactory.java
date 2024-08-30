package com.gmail.merikbest2015.batch;

import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManagerFactory;

@Service
public class JpaItemWriterFactory {

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Bean
    @StepScope
    public <T>JpaItemWriter<T> jpaItemWriter() {
        JpaItemWriter<T> writer = new JpaItemWriter<>();
        writer.setEntityManagerFactory(entityManagerFactory);
        return writer;
    }
}
