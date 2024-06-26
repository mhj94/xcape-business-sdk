package com.chadev.xcape.core.domain.dto;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.chadev.xcape.core.domain.entity.Hint;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

/**
 * A DTO for the {@link Hint} entity
 */

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HintDto {

    private Long id;
    private Long themeId;
    private String code;
    private String message1;
    private String message2;
    private Boolean isUsed;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime registeredAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime modifiedAt;

    public HintDto(Hint entity) {
        this.id = entity.getId();
        this.code = entity.getCode();
        this.message1 = entity.getMessage1();
        this.message2 = entity.getMessage2();
        this.isUsed = entity.getIsUsed();
        this.registeredAt = entity.getRegisteredAt();
        this.modifiedAt = entity.getModifiedAt();
        this.themeId = entity.getTheme().getId();
    }
}

