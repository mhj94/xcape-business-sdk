package com.chadev.xcape.admin.service;

import com.chadev.xcape.core.domain.dto.TagDto;
import com.chadev.xcape.core.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    public List<TagDto> getTagList() {
        return tagRepository.findAll().stream().map(TagDto::new).toList();
    }

    public List<TagDto> getTagListByThemeId(Long themeId) {
        return tagRepository.findByThemeId(themeId).stream().map(TagDto::new).toList();
    }
}
