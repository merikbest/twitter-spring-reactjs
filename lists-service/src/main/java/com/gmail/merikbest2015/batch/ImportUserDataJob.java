package com.gmail.merikbest2015.batch;

import com.gmail.merikbest2015.client.UserClient;
import com.gmail.merikbest2015.event.UpdateUserEvent;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.service.UserHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageImpl;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
public class ImportUserDataJob {

    private static final String JOB_NOME = "importUserData";
    private final int chunkSize = 100;
    private final int periodOfDays = 10;

    private final UserClient userClient;
    private final UserHandlerService userHandlerService;
    private final JpaItemWriterFactory jpaItemWriterFactory;
    private final PlatformTransactionManager transactionManager;

    @Bean(JOB_NOME)
    public Job importUserDataJob(JobRepository jobRepository) {
        return new JobBuilder(JOB_NOME, jobRepository)
                .incrementer(new RunIdIncrementer())
                .start(importUserStep(jobRepository))
                .build();
    }

    private Step importUserStep(JobRepository jobRepository) {
        return new StepBuilder("importUserStep", jobRepository)
                .<UpdateUserEvent, User>chunk(chunkSize, transactionManager)
                .reader(usersReader())
                .processor(userHandlerService::handleNewOrUpdateUser)
                .writer(jpaItemWriterFactory.jpaItemWriter())
                .build();
    }

    @Bean
    @StepScope
    UserItemReader usersReader() {
        return new UserItemReader(pageable -> new PageImpl<>(
                userClient.getBatchUsers(periodOfDays, pageable.getPageNumber(), pageable.getPageSize())),
                chunkSize
        );
    }
}
