package com.chadev.xcape.admin.service;

import com.chadev.xcape.core.domain.dto.scheduler.SchedulerDto;
import com.chadev.xcape.core.domain.entity.Merchant;
import com.chadev.xcape.core.domain.entity.scheduler.Scheduler;
import com.chadev.xcape.core.repository.MerchantRepository;
import com.chadev.xcape.core.repository.scheduler.SchedulerRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RequiredArgsConstructor
@Service
public class SchedulerService {

    private final SchedulerRepository schedulerRepository;
    private final MerchantRepository merchantRepository;

    @PersistenceContext
    private final EntityManager entityManager;

    @Transactional
    public int batchReservation(LocalDate date) {
        return entityManager.createNativeQuery("""
                insert ignore into
                        reservation(reservation_id, merchant_id, reservation_merchant_name, theme_id, reservation_theme_name, reservation_date, reservation_time, reserved_by, phone_number, participant_count, reservation_price, room_type, is_reserved, unreserved_time, registered_at, modified_at)
                    select
                        concat(date_format(?, '%Y-%m-%d-'), uuid()) as reservation_id,
                        m.merchant_id as 'merchant_id',
                        m.merchant_name as 'reservation_merchant_name',
                        t.theme_id as 'theme_id',
                        t.theme_name_ko as 'reservation_theme_name',
                        date_format(?, '%Y-%m-%d') as 'date',
                        t2.time as 'reservation_time',
                        null as 'reserved_by',
                        null as 'phone_number',
                        null as 'participant_count',
                        null as 'reservation_price',
                        null as 'room_type',
                        0 as 'reservation_price',
                        null as 'unreserved_time',
                        now() as 'registered_at',
                        now() as 'modified_at'
                    from theme t left join merchant m on t.merchant_id = m.merchant_id left join timetable t2 on t.theme_id = t2.theme_id
                    order by merchant_id, theme_id, timetable_id
                """)
                .setParameter(1, date.format(DateTimeFormatter.ISO_DATE))
                .setParameter(2, date.format(DateTimeFormatter.ISO_DATE))
                .executeUpdate();
    }

    public SchedulerDto turnOnScheduler(Long merchantId) {
        Merchant merchant = merchantRepository.findById(merchantId).orElseThrow(IllegalArgumentException::new);
        Scheduler scheduler = schedulerRepository.findByMerchant(merchant).orElseThrow(IllegalArgumentException::new);
        scheduler.setIsAwake(true);
        schedulerRepository.save(scheduler);
        return SchedulerDto.from(scheduler);
    }

    public SchedulerDto turnOffScheduler(Long merchantId) {
        Merchant merchant = merchantRepository.findById(merchantId).orElseThrow(IllegalArgumentException::new);
        Scheduler schedulerAwake = schedulerRepository.findByMerchant(merchant).orElseThrow(IllegalArgumentException::new);
        schedulerAwake.setIsAwake(false);
        schedulerRepository.save(schedulerAwake);
        return SchedulerDto.from(schedulerAwake);
    }

    public SchedulerDto updateTime(Long merchantId, Integer time) {
        Merchant merchant = merchantRepository.findById(merchantId).orElseThrow(IllegalArgumentException::new);
        Scheduler scheduler = schedulerRepository.findByMerchant(merchant).orElseThrow(IllegalArgumentException::new);
        scheduler.setTime(LocalTime.of(time, 0));
        Scheduler savedScheduler = schedulerRepository.save(scheduler);
        return SchedulerDto.from(savedScheduler);
    }
}
