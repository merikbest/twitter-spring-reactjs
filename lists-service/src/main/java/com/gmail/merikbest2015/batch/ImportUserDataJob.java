package com.gmail.merikbest2015.batch;

import com.gmail.merikbest2015.event.UpdateUserEvent;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.support.DefaultBatchConfiguration;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableBatchProcessing
@RequiredArgsConstructor
public class ImportUserDataJob extends DefaultBatchConfiguration {

    private static final String JOB_NOME = "importUserData";

    private final JpaItemWriterFactory jpaItemWriterFactory;

    @Bean(JOB_NOME)
    public Job importUserDataJob(JobRepository jobRepository) {
        return new JobBuilder(JOB_NOME, jobRepository)
                .incrementer(new RunIdIncrementer())
                .start(importUserStep(jobRepository))
                .build();
    }

    private Step importUserStep(JobRepository jobRepository) {
        return new StepBuilder("importUserStep", jobRepository)
                .<UpdateUserEvent, User>chunk(100, this.getTransactionManager())
                .reader(new UserItemReader(pageable -> null, 100)) // TODO add getBatchUsers
                .processor(updateUserEvent -> null)  // TODO add save users
                .writer(jpaItemWriterFactory.jpaItemWriter())
                .build();
    }
}
