package com.chadev.xcape.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chadev.xcape.core.domain.converter.DtoConverter;
import com.chadev.xcape.core.domain.dto.HintDto;
import com.chadev.xcape.core.repository.HintRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HintService {

	private final HintRepository hintRepository;
	private final DtoConverter dtoConverter;

	public List<HintDto> getHintList() {
		return hintRepository.findAll()
			.stream()
			.filter(hint -> hint.getTheme() != null)
			.map(dtoConverter::toHintDto)
			.toList();
	}

	public List<HintDto> getHintListByThemeId(Long themeId) {
		return hintRepository.findAllByThemeId(themeId)
			.stream()
			.map(dtoConverter::toHintDto)
			.toList();
	}
}
