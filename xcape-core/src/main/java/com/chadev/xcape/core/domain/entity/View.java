package com.chadev.xcape.core.domain.entity;

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
    private Long storageId;

    @Column
    private Long tagId;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private ViewType type;

    @Column(length = 50)
    private String answer;

    @Column
    private Integer height;

    @Column(length = 50)
    private String moveToPage;

    @Column
    private Long targetTag;
}
