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

    private Long tagId;

    private ViewType type;

    private String url;

    private String filename;

    private String answer;

    private Integer height;

    private String moveToPage;

    private Long targetTagId;

    private String message1;

    private String message2;

    private String referenceCode;

    private Integer orders;

    public ViewDto(View entity) {
        this.id = entity.getId();
        this.tagId = entity.getTagId();
        this.type = entity.getType();
        this.url = entity.getUrl();
        this.filename = entity.getFilename();
        this.answer = entity.getAnswer();
        this.height = entity.getHeight();
        this.moveToPage = entity.getMoveToPage();
        this.targetTagId = entity.getTargetTagId();
        this.message1 = entity.getMessage1();
        this.message2 = entity.getMessage2();
        this.referenceCode = entity.getReferenceCode();
        this.orders = entity.getOrders();
    }
}
