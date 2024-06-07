package com.chadev.xcape.core.domain.entity;

import com.chadev.xcape.core.domain.type.FileType;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@NoArgsConstructor
@Builder
@Table(name = "storage")
@AllArgsConstructor
public class Storage {

    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "storage_id")
    private Long id;

    @Column
    private Long merchantId;

    @Column
    private Long themeId;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private FileType fileType;

    @Column(length = 255)
    private String url;

    @Column(length = 50)
    private String filename;
}
