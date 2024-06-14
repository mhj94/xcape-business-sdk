package com.chadev.xcape.core.domain.dto;

import com.chadev.xcape.core.domain.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagDto {

    private Long id;

    private Long merchantId;

    private Long themeId;

    private String tagName;

    private String referenceCode;

    public TagDto(Tag entity) {
        this.id = entity.getId();
        this.merchantId = entity.getMerchantId();
        this.themeId = entity.getThemeId();
        this.tagName = entity.getTagName();
        this.referenceCode = entity.getReferenceCode();
    }
}
