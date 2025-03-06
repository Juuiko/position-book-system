package dev.alexmahon.position_book_system.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.alexmahon.position_book_system.database.MemoryDatabase;
import dev.alexmahon.position_book_system.models.TradeEvent;
import dev.alexmahon.position_book_system.models.TradeEventRequest;

@Service
public class AdminService {

    @Autowired
    MemoryDatabase dbService; 

    public void emptyDatabase(){
        dbService.clear();
        System.out.println("Database cleared without issue!");
    }

    public void populateDatabase(){
        ObjectMapper objectMapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("static/testData.json");
        try {
            TradeEventRequest events = objectMapper.readValue(resource.getInputStream(), TradeEventRequest.class);
            for (TradeEvent event : events.getEvents()) {
                dbService.insertTradeEvent(event);
            }
        } catch (IOException e) {
            System.err.println("Error reading JSON file: " + e.getMessage());
        }
        System.out.println("Database populated successfully!");
    }
}
