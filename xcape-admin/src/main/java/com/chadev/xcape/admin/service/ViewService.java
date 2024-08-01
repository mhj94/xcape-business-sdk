package com.chadev.xcape.admin.service;

import com.chadev.xcape.core.domain.dto.ViewDto;
import com.chadev.xcape.core.domain.entity.View;
import com.chadev.xcape.core.exception.XcapeException;
import com.chadev.xcape.core.repository.ViewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ViewService {

	private final ViewRepository viewRepository;

	public List<ViewDto> getViewList() {
		return viewRepository.findAll().stream().map(ViewDto::new).toList();
	}

	@Transactional
	public void modifyViewList(List<ViewDto> viewDtoList) {
		if (viewDtoList.isEmpty()) {
			throw XcapeException.NOT_EXISTENT_VIEW_LIST();
		}

		viewRepository.deleteAllByTagId(viewDtoList.get(0).getTagId());

		List<View> viewList = viewDtoList.stream().map(viewDto ->
				View.builder()
						.tagId(viewDto.getTagId())
						.type(viewDto.getType())
						.url(viewDto.getUrl())
						.filename(viewDto.getFilename())
						.height(viewDto.getHeight())
						.answer(viewDto.getAnswer())
						.targetTagId(viewDto.getTargetTagId())
						.message1(viewDto.getMessage1())
						.message2(viewDto.getMessage2())
						.orders(viewDto.getOrders())
						.build()).toList();

		viewRepository.saveAll(viewList);
	}
}
