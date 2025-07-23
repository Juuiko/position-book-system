package dev.alexmahon.position_book_system.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;

import dev.alexmahon.position_book_system.models.Positions;
import dev.alexmahon.position_book_system.models.TradeEvent;
import dev.alexmahon.position_book_system.models.TradeEventRequest;
import dev.alexmahon.position_book_system.services.EventsService;

@RestController
@RequestMapping("/api/v1/events")
public class EventsController {

    @Autowired
    EventsService service; 

    @PostMapping("/new-trades")
    public ResponseEntity<Void> postTradeEvents(@RequestBody TradeEventRequest events) {
        service.setTradeEvents(events.getEvents());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<TradeEvent[]> getEventAll() {
        return new ResponseEntity<>(
            service.getEventAll(), HttpStatus.OK
        );
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<TradeEvent> getEventById(@PathVariable int id) {
        return new ResponseEntity<>(
            service.getEventById(id), HttpStatus.OK
        );
    }

    @GetMapping("/positions")
    public ResponseEntity<PositionsResponse> getPositions (
            @RequestParam(required = false) String accountId, 
            @RequestParam(required = false) String secId
    ) {
        // if requesting filtered
        if (accountId != null || secId != null) {
            PositionsResponse finalBody = new PositionsResponse(service.getPositions(accountId,secId));
            return new ResponseEntity<>(finalBody, HttpStatus.OK);
        }
        
        // else return all
        PositionsResponse finalBody = new PositionsResponse(service.getPositions());
        return new ResponseEntity<>(finalBody, HttpStatus.OK);
    }

    public static class PositionsResponse {

        @JsonProperty("Positions")
        private final Positions[] Positions;

        // Constructor
        public PositionsResponse(Positions[] positions) {
            this.Positions = positions;
        }
    }
}

