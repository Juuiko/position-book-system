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

        // compute if key is in map
        positionsDb.compute(eventKey, (_, _) -> {
            if (positionsDb.isEmpty() || !positionsDb.containsKey(eventKey)) {
                // create new entry
                if (event.getAction() == TradeEventAction.CANCEL) {
                    System.err.println("ERROR: Cancel event received on empty database.");
                    return null;
                }

                ArrayList<TradeEvent> eventsArr = new ArrayList<>();
                eventsArr.add(event);
                // return array with new data
                return new Positions(
                        event.getAccount(),
                        event.getSecurity(),
                        event.getQuantity(),
                        eventsArr
                );
            } else {
                // key is in map, so update the value
                return updatePositions(positionsDb.get(eventKey), event);
            }
        });
    }

    private Positions updatePositions(Positions position, TradeEvent newEvent){
        // append event to event list
        ArrayList<TradeEvent> updatedEvents = position.getEvents();
        updatedEvents.add(newEvent);
        position.setEvents(updatedEvents);

        // update total quantity
        int updatedQuantity = position.getQuantity();
        // match action & update quantity based on action
        switch (newEvent.getAction()) {
            case BUY:
                updatedQuantity += newEvent.getQuantity();
                break;
            case SELL:
                updatedQuantity -= newEvent.getQuantity();
                break;
            case CANCEL:
                int cancelId = IntStream.range(0, updatedEvents.size())
                        .filter(i -> updatedEvents.get(i).getId() == newEvent.getId())
                        .findFirst()
                        .orElse(-1);
                TradeEventAction cancelledEventAction = updatedEvents.get(cancelId).getAction();
                if (cancelledEventAction == TradeEventAction.BUY) {
                    updatedQuantity -= updatedEvents.get(cancelId).getQuantity();
                } else if (cancelledEventAction == TradeEventAction.SELL) {
                    updatedQuantity += updatedEvents.get(cancelId).getQuantity();
                }
                break;
            default:
                System.err.println("ERROR: Invalid action type " + newEvent.getAction());
                break;
        }
        position.setQuantity(updatedQuantity);

        return position;
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
            return positionsDb.values()
                .stream()
                .filter(positions -> positions.getAccount().equals(accountFilter))
                .toArray(Positions[]::new);

        } else if (securityFilter != null) {
            return positionsDb.values()
                .stream()
                .filter(positions -> positions.getAccount().equals(securityFilter))
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
