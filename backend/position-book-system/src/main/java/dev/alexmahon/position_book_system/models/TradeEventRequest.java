package dev.alexmahon.position_book_system.models;

import java.util.List;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.annotation.JsonProperty;


@Component
public class TradeEventRequest {
    @JsonProperty("Events")
    private List<TradeEvent> events;

    public List<TradeEvent> getEvents() {
        return events;
    }
}

