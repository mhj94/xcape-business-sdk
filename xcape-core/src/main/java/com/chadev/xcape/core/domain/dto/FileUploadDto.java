package com.chadev.xcape.core.domain.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
public class FileUploadDto {
    private MultipartFile file;
    private Long merchantId;
    private Long themeId;
}
