package com.chadev.xcape.core.repository;

import com.chadev.xcape.core.domain.entity.View;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewRepository extends JpaRepository<View, Long> {
    void deleteAllByTagId(Long tagId);
}
