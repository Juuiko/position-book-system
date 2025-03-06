package dev.alexmahon.position_book_system.integrationTests;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import dev.alexmahon.position_book_system.database.MemoryDatabase;

import org.springframework.http.MediaType;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@SpringBootTest
@AutoConfigureMockMvc
class RequiredTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MemoryDatabase database;


    @BeforeEach
    void setUp() {
        database.clear();
    }
    
    @Test
    void test1() throws Exception {
        String input = """
            {
                "Events": [
                  {
                    "ID": 1,
                    "Action": "BUY",
                    "Account": "ACC1",
                    "Security": "SEC1",
                    "Quantity": 100
                  },
                  {
                    "ID": 2,
                    "Action": "BUY",
                    "Account": "ACC1",
                    "Security": "SEC1",
                    "Quantity": 50
                  }
                ]
              }
        """;

        String output = """
            {
                "Positions": [
                  {
                    "Account": "ACC1",
                    "Security": "SEC1",
                    "Quantity": 150,
                    "Events": [
                      {
                        "ID": 1,
                        "Action": "BUY",
                        "Account": "ACC1",
                        "Security": "SEC1",
                        "Quantity": 100
                      },
                      {
                        "ID": 2,
                        "Action": "BUY",
                        "Account": "ACC1",
                        "Security": "SEC1",
                        "Quantity": 50
                      }
                    ]
                  }
                ]
              }
        """;

        mockMvc.perform(post("/api/v1/events/new-trades")
                .contentType(MediaType.APPLICATION_JSON)
                .content(input))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/v1/events/positions"))
                .andExpect(status().isOk())
                .andExpect(content().json(output));
    }

    @Test
    void test2() throws Exception {
        String input = """
          {
            "Events": [
              {
                "ID": 3,
                "Action": "BUY",
                "Account": "ACC1",
                "Security": "SEC1",
                "Quantity": 12
              },
              {
                "ID": 4,
                "Action": "BUY",
                "Account": "ACC1",
                "Security": "SECXYZ",
                "Quantity": 50
              },
              {
                "ID": 5,
                "Action": "BUY",
                "Account": "ACC2",
                "Security": "SECXYZ",
                "Quantity": 33
              },
              {
                "ID": 6,
                "Action": "BUY",
                "Account": "ACC1",
                "Security": "SEC1",
                "Quantity": 20
              }
            ]
          }
        """;

        String output = """
          {
            "Positions": [
              {
                "Account": "ACC1",
                "Security": "SEC1",
                "Quantity": 32,
                "Events": [
                  {
                    "ID": 3,
                    "Action": "BUY",
                    "Account": "ACC1",
                    "Security": "SEC1",
                    "Quantity": 12
                  },
                  {
                    "ID": 6,
                    "Action": "BUY",
                    "Account": "ACC1",
                    "Security": "SEC1",
                    "Quantity": 20
                  }
                ]
              },
              {
                "Account": "ACC1",
                "Security": "SECXYZ",
                "Quantity": 50,
                "Events": [
                  {
                    "ID": 4,
                    "Action": "BUY",
                    "Account": "ACC1",
                    "Security": "SECXYZ",
                    "Quantity": 50
                  }
                ]
              },
              {
                "Account": "ACC2",
                "Security": "SECXYZ",
                "Quantity": 33,
                "Events": [
                  {
                    "ID": 5,
                    "Action": "BUY",
                    "Account": "ACC2",
                    "Security": "SECXYZ",
                    "Quantity": 33
                  }
                ]
              }
            ]
          }
        """;

        mockMvc.perform(post("/api/v1/events/new-trades")
                .contentType(MediaType.APPLICATION_JSON)
                .content(input))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/v1/events/positions"))
                .andExpect(status().isOk())
                .andExpect(content().json(output));
    }

    @Test
    void test3() throws Exception {
        String input = """
          {
            "Events": [
              {
                "ID": 7,
                "Action": "BUY",
                "Account": "ACC1",
                "Security": "SEC1",
                "Quantity": 100
              },
              {
                "ID": 8,
                "Action": "SELL",
                "Account": "ACC1",
                "Security": "SEC1",
                "Quantity": 50
              }
            ]
          }
        """;

        String output = """
          {
            "Positions": [
              {
                "Account": "ACC1",
                "Security": "SEC1",
                "Quantity": 50,
                "Events": [
                  {
                    "ID": 7,
                    "Action": "BUY",
                    "Account": "ACC1",
                    "Security": "SEC1",
                    "Quantity": 100
                  },
                  {
                    "ID": 8,
                    "Action": "SELL",
                    "Account": "ACC1",
                    "Security": "SEC1",
                    "Quantity": 50
                  }
                ]
              }
            ]
          }
        """;

        mockMvc.perform(post("/api/v1/events/new-trades")
                .contentType(MediaType.APPLICATION_JSON)
                .content(input))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/v1/events/positions"))
                .andExpect(status().isOk())
                .andExpect(content().json(output));
    }

    @Test
    void test4() throws Exception {
        String input = """
          {
            "Events": [
              {
                "ID": 9,
                "Action": "BUY",
                "Account": "ACC1",
                "Security": "SEC1",
                "Quantity": 100
              },
              {
                "ID": 9,
                "Action": "CANCEL",
                "Account": "ACC1",
                "Security": "SEC1",
                "Quantity": 0
              },
              {
                "ID": 10,
                "Action": "BUY",
                "Account": "ACC1",
                "Security": "SEC1",
                "Quantity": 5
              }
            ]
          }
        """;

        String output = """
          {
            "Positions": [
              {
                "Account": "ACC1",
                "Security": "SEC1",
                "Quantity": 5,
                "Events": [
                  {
                    "ID": 9,
                    "Action": "BUY",
                    "Account": "ACC1",
                    "Security": "SEC1",
                    "Quantity": 100
                  },
                  {
                    "ID": 9,
                    "Action": "CANCEL",
                    "Account": "ACC1",
                    "Security": "SEC1",
                    "Quantity": 0
                  },
                  {
                    "ID": 10,
                    "Action": "BUY",
                    "Account": "ACC1",
                    "Security": "SEC1",
                    "Quantity": 5
                  }
                ]
              }
            ]
          }
        """;

        mockMvc.perform(post("/api/v1/events/new-trades")
                .contentType(MediaType.APPLICATION_JSON)
                .content(input))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/v1/events/positions"))
                .andExpect(status().isOk())
                .andExpect(content().json(output));
    }
}
