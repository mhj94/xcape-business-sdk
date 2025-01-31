package com.chadev.xcape.core.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class XcapeException extends RuntimeException {

    private String errorCode;
    private String message;

    public XcapeException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.message = errorCode.getMessage();
        this.errorCode = errorCode.getCode();
    }

    public static XcapeException NOT_EXISTENT_MERCHANT() {return new XcapeException(ErrorCode.NOT_EXISTENT_MERCHANT);}

    public static XcapeException NOT_EXISTENT_THEME() {return new XcapeException(ErrorCode.NOT_EXISTENT_THEME);}

    public static XcapeException NOT_EXISTENT_PRICE() {return new XcapeException(ErrorCode.NOT_EXISTENT_PRICE);}

    public static XcapeException NOT_EXISTENT_TIMETABLE() {return new XcapeException(ErrorCode.NOT_EXISTENT_TIMETABLE);}

    public static XcapeException NOT_EXISTENT_RESERVATION() {return new XcapeException(ErrorCode.NOT_EXISTENT_RESERVATION);}
    public static XcapeException ALREADY_RESERVATION() {return new XcapeException(ErrorCode.ALREADY_RESERVATION);}

    public static XcapeException OVERFLOW_RESERVATION() {return new XcapeException(ErrorCode.OVERFLOW_RESERVATION);}

    public static XcapeException NOT_EXISTENT_ROOM_TYPE() {return new XcapeException(ErrorCode.NOT_EXISTENT_ROOM_TYPE);}
    public static XcapeException FILE_NOT_FOUND() {return new XcapeException(ErrorCode.FILE_NOT_FOUND);}
    public static XcapeException FILE_FORMAT_EXCEPTION() {return new XcapeException(ErrorCode.FILE_FORMAT_EXCEPTION);}
    public static XcapeException UNNAMED_FILE() {return new XcapeException(ErrorCode.UNNAMED_FILE);}
    public static XcapeException FILE_UPLOAD_EXCEPTION() {return new XcapeException(ErrorCode.FILE_UPLOAD_EXCEPTION);}
    public static XcapeException EXISTENT_HINT_CODE() {return new XcapeException(ErrorCode.EXISTENT_HINT_CODE);}
    public static XcapeException EXISTENT_HINT() {return new XcapeException(ErrorCode.EXISTENT_HINT);}
    public static XcapeException NOT_EXISTENT_HINT() {return new XcapeException(ErrorCode.NOT_EXISTENT_HINT);}

    public static XcapeException NOT_EXISTENT_VIEW_LIST() {return new XcapeException(ErrorCode.NOT_EXISTENT_VIEW_LIST);}
}
