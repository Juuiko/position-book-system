package dev.alexmahon.position_book_system.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.alexmahon.position_book_system.services.AdminService;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Autowired
    AdminService service;

    @DeleteMapping("/delete-database")
    public ResponseEntity<Void> emptyDatabase() {
        service.emptyDatabase();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/populate-database")
    public ResponseEntity<Void> populateDatabase() {
        service.populateDatabase();
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
