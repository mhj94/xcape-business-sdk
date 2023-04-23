package com.chadev.xcape.core.domain.dto;

import com.chadev.xcape.core.domain.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationDto {

    // 기본값
    private String id;

    private Long seq;

    private Long themeId;

    private Long merchantId;

    private String themeName;

    private String merchantName;

    private LocalDate date;

    private String time;

    private Boolean isReserved;

    // 예약 등록 시 설정되는 값
    private String reservedBy;

    private String phoneNumber;

    private Integer participantCount;

    private String roomType;

    private Integer price;

    public ReservationDto(Reservation entity) {
        this.id = entity.getId();
        this.seq = entity.getSeq();
        this.themeId = entity.getThemeId();
        this.merchantId = entity.getMerchant().getId();
        this.themeName = entity.getThemeName();
        this.merchantName = entity.getMerchant().getName();
        this.date = entity.getDate();
        this.time = entity.getTime().format(DateTimeFormatter.ofPattern("HH:mm"));
        this.isReserved = entity.getIsReserved();
        if (entity.getIsReserved()){
            this.reservedBy = entity.getReservedBy();
            this.phoneNumber = entity.getPhoneNumber();
            this.participantCount = entity.getParticipantCount();
            this.roomType = entity.getRoomType();
            this.price = entity.getPrice();
        }
    }

    // for fake reservation
    public static ReservationDto fake(Reservation entity) {
        return new ReservationDto(
                entity.getId(),
                entity.getSeq(),
                entity.getThemeId(),
                entity.getMerchant().getId(),
                entity.getThemeName(),
                entity.getMerchant().getName(),
                entity.getDate(),
                entity.getTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                true,
                "XCAPE",
                "01000000000",
                2,
                "general",
                0
        );
    }


}
