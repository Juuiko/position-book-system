package dev.alexmahon.position_book_system.models;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

@Component
public class Positions {

    @JsonProperty("Account")
    private String account;
    @JsonProperty("Security")
    private String security;
    @JsonProperty("Quantity")
    private int quantity;
    @JsonProperty("Events")
    private ArrayList<TradeEvent> events;

    protected Positions() {}

    public Positions(String account, String secutiy, int quantity, ArrayList<TradeEvent> events) {
        this.account = account;
        this.security = secutiy;
        this.quantity = quantity;
        this.events = events;
    }

    public String getAccount() { return this.account; }

    public String getSecurity() { return this.security; }

    public int getQuantity() { return this.quantity; }

    public ArrayList<TradeEvent> getEvents() { return this.events; }    
    
    public void setEvents(ArrayList<TradeEvent> newEvents) { this.events = newEvents; }

    public void setQuantity(int newQuantity) { this.quantity = newQuantity; }

}
