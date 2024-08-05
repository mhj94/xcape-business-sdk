package com.chadev.xcape.admin.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;
import java.io.InputStream;

@RequiredArgsConstructor
@Configuration
public class FirebaseConfig {

    @Value("${firebase.storage.config-file}")
    private String configFile;

    @Value("${firebase.storage.bucket}")
    private String firebaseBucket;

    private final ResourceLoader resourceLoader;

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            Resource resource = resourceLoader.getResource(configFile);
            try (InputStream serviceAccount = resource.getInputStream()) {

                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .setStorageBucket(firebaseBucket)
                        .build();

                return FirebaseApp.initializeApp(options);
            }
        }
        return null;
    }
}
