package dev.alexmahon.position_book_system.database;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

import dev.alexmahon.position_book_system.enums.TradeEventAction;
import dev.alexmahon.position_book_system.models.Positions;
import dev.alexmahon.position_book_system.models.TradeEvent;

@SpringBootTest
class YourTest {
    @Autowired
    private MemoryDatabase memoryDatabase;
    
    @Test
    public void test_position_quantity_updates_with_buy_sell_events() {
        memoryDatabase.clear();

        TradeEvent buyEvent = new TradeEvent(1, TradeEventAction.BUY, "ACC1", "AAPL", 100);
        TradeEvent sellEvent = new TradeEvent(2, TradeEventAction.SELL, "ACC1", "AAPL", 40);

        memoryDatabase.insertTradeEvent(buyEvent);
        memoryDatabase.insertTradeEvent(sellEvent);

        Positions[] positions = memoryDatabase.getDatabase();

        assertEquals(1, positions.length);
        assertEquals(60, positions[0].getQuantity());
        assertEquals("ACC1", positions[0].getAccount());
        assertEquals("AAPL", positions[0].getSecurity());
    }
    
}
