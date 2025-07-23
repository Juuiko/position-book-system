package dev.alexmahon.position_book_system.models;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

import dev.alexmahon.position_book_system.enums.TradeEventAction;

@Component
public class TradeEvent {

    @JsonProperty("ID")
    private int id;

    @JsonProperty("Action")
    private TradeEventAction action;

    @JsonProperty("Account")
    private String account;

    @JsonProperty("Security")
    private String security;

    @JsonProperty("Quantity")
    private int quantity;

    protected TradeEvent() {}

    public TradeEvent(int id, TradeEventAction action, String account, String security, int quantity) {
        this.id = id;
        this.action = action;
        this.account = account;
        this.security = security;
        this.quantity = quantity;
    }

    public int getId() { return this.id; }

    public String getAccount() { return this.account; }

    public TradeEventAction getAction() { return this.action; }

    public String getSecurity() { return this.security; }

    public int getQuantity() { return this.quantity; }

    public void setId(int eventId) { this.id = eventId; }
}
