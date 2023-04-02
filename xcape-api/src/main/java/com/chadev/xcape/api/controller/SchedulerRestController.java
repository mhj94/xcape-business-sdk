package com.chadev.xcape.api.controller;

import com.chadev.xcape.api.service.ReservationService;
import com.chadev.xcape.api.service.SchedulerService;
import com.chadev.xcape.core.domain.dto.scheduler.SchedulerDto;
import com.chadev.xcape.core.response.Response;
import com.chadev.xcape.core.service.CoreMerchantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RequiredArgsConstructor
@RestController
public class SchedulerRestController {

    private final SchedulerService schedulerService;
    private final CoreMerchantService merchantService;
    private final ReservationService reservationService;

    // 지점별 빈 예약 생성
    @Scheduled(cron = "0 0 0-6 * * *")  //  00시 ~ 06시 매시간 1분에 동작
    public Response<Void> createBatchReservations() {
        int hour = LocalTime.now().getHour();
        LocalDate date = LocalDate.now().plusDays(30);

        merchantService.getMerchantIdList().forEach((merchantId) -> {
            SchedulerDto scheduler = schedulerService.getScheduler(merchantId);
            if (
                    scheduler.getIsAwake() &&
                            scheduler.getTime().getHour() == hour &&
                            !schedulerService.getClosedDateList(merchantId).contains(date)
            ) {
                reservationService.createEmptyReservationByMerchantId(merchantId, date);
            }
        });
        return Response.success();
    }

    @GetMapping("/test")
    @Scheduled(cron = "0 30 11-14 * * *")  //  00시 ~ 06시 매시간 1분에 동작
    public void test() {
        int hour = LocalTime.now().getHour();
        LocalDate localDate = LocalDate.now();

        log.info("hour={}", hour);
        log.info("date={}", localDate.format(DateTimeFormatter.ISO_DATE));
    }
}
