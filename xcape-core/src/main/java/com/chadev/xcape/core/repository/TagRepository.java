package com.chadev.xcape.core.repository;

import com.chadev.xcape.core.domain.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByThemeId(Long themeId);
}
