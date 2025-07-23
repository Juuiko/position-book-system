package dev.alexmahon.position_book_system.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.alexmahon.position_book_system.database.MemoryDatabase;
import dev.alexmahon.position_book_system.models.Positions;
import dev.alexmahon.position_book_system.models.TradeEvent;

@Service
public class EventsService {

    @Autowired
    MemoryDatabase dbService;

    public void setTradeEvents(List<TradeEvent> trades) {
        System.out.println("Inserting trade event(s)");
        for (TradeEvent tradeEvent : trades) {
            dbService.insertTradeEvent(tradeEvent);
        }  
    }

    public TradeEvent getEventById(int id){
        System.out.println("Getting trade event");
        return dbService.getEventById(id);
    }

    public Positions[] getPositions(){
        System.out.println("Getting positions");
        return dbService.getDatabase();
    }

    public Positions[] getPositions(String accountID, String securityID){
        System.out.println("Getting filtered positions");
        return dbService.getDatabaseFiltered(accountID, securityID);
    }

    public TradeEvent[] getEventAll() {
        System.out.println("Getting all events");
        return dbService.getEventAll();
    }

}
