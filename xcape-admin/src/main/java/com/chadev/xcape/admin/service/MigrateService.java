package com.chadev.xcape.admin.service;

import com.chadev.xcape.core.domain.dto.StorageDto;
import com.chadev.xcape.core.domain.dto.TagDto;
import com.chadev.xcape.core.domain.dto.ViewDto;
import com.chadev.xcape.core.domain.entity.Storage;
import com.chadev.xcape.core.domain.entity.Tag;
import com.chadev.xcape.core.domain.entity.View;
import com.chadev.xcape.core.repository.StorageRepository;
import com.chadev.xcape.core.repository.TagRepository;
import com.chadev.xcape.core.repository.ViewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MigrateService {

    private final StorageRepository storageRepository;
    private final TagRepository tagRepository;
    private final ViewRepository viewRepository;

    public void migrateStorageData(List<StorageDto> storageDtoList) {
        List<Storage> list = storageDtoList.stream().map(Storage::new).toList();
        storageRepository.saveAll(list);
    }

    public void migrateTagData(List<TagDto> tagDtoList) {
        List<Tag> list = tagDtoList.stream().map(Tag::new).toList();
        tagRepository.saveAll(list);
    }

    public void migrateViewData(List<ViewDto> viewDtoList) {
        List<View> list = viewDtoList.stream().map(View::new).toList();
        viewRepository.saveAll(list);
    }
}
