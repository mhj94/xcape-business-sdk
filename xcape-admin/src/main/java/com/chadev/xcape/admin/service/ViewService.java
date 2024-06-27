package com.chadev.xcape.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chadev.xcape.core.domain.dto.ViewDto;
import com.chadev.xcape.core.repository.ViewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ViewService {

	private final ViewRepository viewRepository;

	public List<ViewDto> getViewList() {
		return viewRepository.findAll().stream().map(ViewDto::new).toList();
	}
}
