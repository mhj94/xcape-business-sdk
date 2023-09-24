package com.chadev.xcape.api;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

import java.util.TimeZone;

@EnableJpaAuditing
@EnableEncryptableProperties
@EntityScan(basePackages = "com.chadev.xcape.core.domain.entity")
@EnableJpaRepositories(basePackages = {"com.chadev.xcape.core.repository"})
@SpringBootApplication (scanBasePackages = {"com.chadev.xcape.api", "com.chadev.xcape.core"})
@EnableRedisRepositories(basePackages = {"com.chadev.xcape.core.repository"})
public class ApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

    @PostConstruct
    public void init() {
        // timezone 설정
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }
}
