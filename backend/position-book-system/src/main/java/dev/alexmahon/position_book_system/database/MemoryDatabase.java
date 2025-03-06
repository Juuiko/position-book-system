package dev.alexmahon.position_book_system.database;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;

import dev.alexmahon.position_book_system.enums.TradeEventAction;
import dev.alexmahon.position_book_system.models.Positions;
import dev.alexmahon.position_book_system.models.TradeEvent;

@Service
public class MemoryDatabase {

    // Private constructor to prevent instantiation
    private MemoryDatabase() {}

    // Thread-safe collections for storing data
    private static final Map<String, Positions> positionsDb = new ConcurrentHashMap<>();

    // Generate position key
    private static String generateKey(String account, String security) {
        return account + "_" + security;
    }

    public void insertTradeEvent(TradeEvent event) {
        String eventKey = generateKey(event.getAccount(), event.getSecurity());

        // if the DB is empty or the user/sec are not in the DB
        if(positionsDb.isEmpty() || !positionsDb.containsKey(eventKey)){
            // create new entry
            if(event.getAction() == TradeEventAction.CANCEL){
                System.err.println("ERROR: Cancel event received on empty database.");
                return;
            }

            ArrayList<TradeEvent> eventsArr = new ArrayList<>();
            eventsArr.add(event);

            positionsDb.put(eventKey, new Positions(
                event.getAccount(),
                event.getSecurity(),
                event.getQuantity(),
                eventsArr
            ));
        } else {
            // add entry to the right exisitng position
            Positions eventPosition = positionsDb.get(eventKey);

            // append event to event list
            ArrayList<TradeEvent> updatedPosition = eventPosition.getEvents();
            updatedPosition.add(event);
            eventPosition.setEvents(updatedPosition);

            // update total quantity
            int updatedQuantity = eventPosition.getQuantity();

            switch (event.getAction()) {
                case BUY:
                    updatedQuantity += event.getQuantity();
                    break;
                case SELL:
                    updatedQuantity -= event.getQuantity();
                    break;
                case CANCEL:
                    int cancelId = IntStream.range(0, updatedPosition.size())
                        .filter(i -> updatedPosition.get(i).getId() == event.getId())
                        .findFirst()
                        .orElse(-1);
                    TradeEventAction cancelledEventAction = updatedPosition.get(cancelId).getAction();
                    if(cancelledEventAction == TradeEventAction.BUY){
                        updatedQuantity -= updatedPosition.get(cancelId).getQuantity();
                    } else if(cancelledEventAction == TradeEventAction.SELL){
                        updatedQuantity += updatedPosition.get(cancelId).getQuantity();
                    }
                    break;
                default:
                    System.err.println("ERROR: Invalid action type " + event.getAction());
                    break;
            }

            eventPosition.setQuantity(updatedQuantity);
        }
    }

    public void printDatabase() {
        List<Positions> positions = new ArrayList<>(positionsDb.values());

        for (Positions position : positions) {
            System.out.println("Position:");
            System.out.println(position.getAccount());
            System.out.println(position.getSecurity());
            System.out.println(position.getQuantity());

            for (TradeEvent trade : position.getEvents()) {
                System.out.println("Event:");
                System.out.println(trade.getId());
                System.out.println(trade.getAccount());
                System.out.println(trade.getAction());
                System.out.println(trade.getSecurity());
                System.out.println(trade.getQuantity());
            }
        }
    }

    public Positions[] getDatabase() {
        return positionsDb.values().toArray(Positions[]::new);    
    }

    public Positions[] getDatabaseFiltered(String accountFilter, String securityFilter) {

        if (accountFilter != null && securityFilter != null) {
            return new Positions[]{positionsDb.get(generateKey(accountFilter, securityFilter))};

        } else if (accountFilter != null) {
            return positionsDb.entrySet()
                .stream()
                .filter(entry -> entry.getValue().getAccount().equals(accountFilter))
                .map(Map.Entry::getValue)
                .toArray(Positions[]::new);

        } else if (securityFilter != null) {
            return positionsDb.entrySet()
                .stream()
                .filter(entry -> entry.getValue().getAccount().equals(securityFilter))
                .map(Map.Entry::getValue)
                .toArray(Positions[]::new);

        } else {
            System.err.println("ERROR: No filter provided to filtered search function.");
            return null;
        }
    }

    public void clear() {
        positionsDb.clear();
    }

    public TradeEvent getEventById(int id) {
        for (Positions position : positionsDb.values()) {
            for (TradeEvent event : position.getEvents()) {
                if (event.getId() == id) {
                    return event;
                }
            }
        }
        System.err.println("ERROR: Event not found for given id.");
        return null;
    }

    public TradeEvent[] getEventAll() {
        return positionsDb.values().stream()
            .flatMap(position -> position.getEvents().stream())
            .toArray(TradeEvent[]::new);
    }
        
}
