package com.chadev.xcape.core.domain.entity;

import com.chadev.xcape.core.domain.dto.TagDto;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@NoArgsConstructor
@Builder
@Table(name = "tag")
@AllArgsConstructor
public class Tag {

    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long id;

    @Column
    private Long merchantId;

    @Column
    private Long themeId;

    @Column(name = "tag_name", length = 50)
    private String name;

    @Column(length = 50)
    private String referenceCode;

    public Tag(TagDto tagDto) {
        this.merchantId = tagDto.getMerchantId();
        this.themeId = tagDto.getThemeId();
        this.name = tagDto.getName();
        this.referenceCode = tagDto.getReferenceCode();
    }
}
