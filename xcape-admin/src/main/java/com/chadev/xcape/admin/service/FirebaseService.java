package com.chadev.xcape.admin.service;

import com.chadev.xcape.core.exception.XcapeException;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class FirebaseService {

    @Value("${firebase.storage.bucket}")
    private String firebaseBucket;

    public void upload(MultipartFile file, String storedFilename) {
        try {
            Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
            InputStream content = new ByteArrayInputStream(file.getBytes());
            bucket.create("files/" + storedFilename, content, file.getContentType());
        } catch (IOException e) {
            throw XcapeException.FILE_UPLOAD_EXCEPTION();
        }
    }
}
