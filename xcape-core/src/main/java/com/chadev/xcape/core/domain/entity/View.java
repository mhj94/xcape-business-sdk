package com.chadev.xcape.core.domain.entity;

import com.chadev.xcape.core.domain.dto.ViewDto;
import com.chadev.xcape.core.domain.type.ViewType;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@NoArgsConstructor
@Builder
@Table(name = "view")
@AllArgsConstructor
public class View {

    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "view_id")
    private Long id;

    @Column
    private Long tagId;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private ViewType type;

    @Column(length = 600)
    private String url;

    @Column(length = 100)
    private String filename;

    @Column(length = 50)
    private String answer;

    @Column
    private Integer height;

    @Column(length = 50)
    private String moveToPage;

    @Column
    private Long targetTagId;

    @Column(length = 100)
    private String referenceCode;

    @Column
    private Integer orders;

    public View(ViewDto viewDto) {
        this.tagId = viewDto.getTagId();
        this.type = viewDto.getType();
        this.url = viewDto.getUrl();
        this.filename = viewDto.getFilename();
        this.answer = viewDto.getAnswer();
        this.height = viewDto.getHeight();
        this.moveToPage = viewDto.getMoveToPage();
        this.targetTagId = viewDto.getTargetTagId();
        this.referenceCode = viewDto.getReferenceCode();
        this.orders = viewDto.getOrders();
    }
}
