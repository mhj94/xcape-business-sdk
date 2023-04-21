package com.chadev.xcape.core.domain.dto;

import com.chadev.xcape.core.domain.entity.ReservationAuthentication;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class ReservationAuthenticationDto {

    private String requestId;

    private Long reservationId;

    private String authenticationNumber;

    private LocalDateTime registeredAt;

    public ReservationAuthenticationDto(String requestId, Long reservationId, LocalDateTime registeredAt) {
        this.requestId = requestId;
        this.reservationId = reservationId;
        this.registeredAt = registeredAt;
    }

    public static ReservationAuthenticationDto from(ReservationAuthentication entity) {
        return new ReservationAuthenticationDto(
                entity.getRequestId(),
                entity.getReservation().getId(),
                entity.getRegisteredAt()
        );
    }
}
