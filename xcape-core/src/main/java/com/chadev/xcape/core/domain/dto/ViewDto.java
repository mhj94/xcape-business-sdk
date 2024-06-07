package com.chadev.xcape.core.domain.dto;

import com.chadev.xcape.core.domain.entity.View;
import com.chadev.xcape.core.domain.type.ViewType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ViewDto {

    private Long id;

    private Long storageId;

    private Long tagId;

    private ViewType type;

    private String answer;

    private Integer height;

    private String moveToPage;

    private Long targetTag;

    public ViewDto(View entity) {
        this.id = entity.getId();
        this.storageId = entity.getStorageId();
        this.tagId = entity.getTagId();
        this.type = entity.getType();
        this.answer = entity.getAnswer();
        this.height = entity.getHeight();
        this.moveToPage = entity.getMoveToPage();
        this.targetTag = entity.getTargetTag();
    }
}
