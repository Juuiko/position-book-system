# Events Endpoints

### Get All Events
Retrieves a list of all trade events in the system.

`GET /events`

Response

`Status: 200 OK`

```json
[
  {
    "ID": "1",
    "Action": "BUY",
    "Account": "ACC001",
    "Security": "AAPL",
    "Quantity": 100,
  },
  {
    "ID": "2",
    "Action": "SELL",
    "Account": "ACC002",
    "Security": "GOOGL",
    "Quantity": 50,

  }
  // ...
]
```

### Get All Positions

Retrieves current positions calculated from all processed trade events.

`GET /events/positions`

Response

`Status: 200 OK`

```json
[
  {
    "Account": "ACC001",
    "Security": "AAPL",
    "Quantity": 150
    "events": [
      {
        "ID": "1",
        "Action": "BUY",
        "Quantity": 100,
      },
      {
        "ID": "3",
        "Action": "BUY",
        "Quantity": 50,
      }
    ],
  },
  {
    "Account": "ACC002",
    "Security": "GOOGL",
    "Quantity": 75
    "events": [
      {
        "ID": "2",
        "Action": "BUY",
        "Quantity": 125,
      },
      {
        "ID": "4",
        "Action": "SELL",
        "Quantity": 50,
      }
    ],
  }
  // ...
]
```

### Get All Events (Alternative Endpoint)

Alternative endpoint to retrieve all trade events with full details.

`GET /events/all`

Response

`Status: 200 OK`

```json
[
  {
    "ID": "1",
    "Action": "BUY",
    "Account": "ACC001",
    "Security": "AAPL",
    "Quantity": 100,
  },
  {
    "ID": "2",
    "Action": "SELL",
    "Account": "ACC002",
    "Security": "GOOGL",
    "Quantity": 50,
  }
  // ...
]
```

### Get Event by ID

Retrieves a specific trade event by its unique identifier.

`GET /events/{id}`

| Parameter    | Type    | Description                                                  |
| ------------ | ------- | ------------------------------------------------------------ |
| ID           | string  | Unique identifier for the trade event                        |


Response

`Status: 200 OK`
```json
{
  "ID": "1",
  "Action": "BUY",
  "Account": "ACC001",
  "Security": "AAPL",
  "Quantity": 100,
}
```

### Create New Trade Event

Processes a new trade event (Buy, Sell, or Cancel) and updates positions accordingly.

`POST /events/new-trades`


Body Parameters

| Parameter       | Type    | Description                                                  |
| --------------- | ------- | ------------------------------------------------------------ |
| Action          | string  | Type of trade event: "BUY", "SELL", or "CANCEL"              |
| Account         | string  | Unique identifier for the trading account                    |
| Security        | string  | Security identifier (e.g., stock symbol)                     |
| Quantity        | integer | Quantity to trade (must be positive for BUY/SELL operations) |
| originalEventId | integer | Reference to original event ID (required only for CANCEL)    |

Request Body Example

```json
{
  "Action": "BUY",
  "Account": "ACC001",
  "Security": "AAPL",
  "Quantity": 100
}
```

Response

`Status: 201 CREATED`
``` json{
  "message": "Trade event processed successfully",
}
```

### Update Trade Event

Updates an existing trade event with new information.

`PATCH /events/{id}`

Parameters

| Parameter    | Type    | Description                                                  |
| ------------ | ------- | ------------------------------------------------------------ |
| ID           | integer | Unique identifier for the trade event                        |

Body Parameters

| Parameter    | Type    | Description                                   |
| ------------ | ------- | --------------------------------------------- |
| Action       | string  | Updated type of trade event (optional)        |
| Account      | string  | Updated trading account identifier (optional) |
| Security     | string  | Updated security identifier (optional)        |
| Quantity     | integer | Updated quantity for the trade (optional)     |


Request Body Example

```json
{
  "Quantity": 150,
  "Action": "BUY"
}
Response
Status: 200 OK
json{
  "ID": "TRD001",
  "Action": "BUY",
  "Account": "ACC001",
  "Security": "AAPL",
  "Quantity": 150,
}
```

### Search Events

Searches for trade events based on query parameters.

`GET /events/search?q={query}`

Parameters


| Parameter    | Type    | Description                                                  |
| ------------ | ------- | ------------------------------------------------------------ |
| Query String | integer | Search query (can match account ID, security ID, or event ID)|

Response

`Status: 200 OK`

```json
[
  {
    "ID": "1",
    "Action": "BUY",
    "Account": "ACC001",
    "Security": "AAPL",
    "Quantity": 100,
  },
  {
    "ID": "3",
    "Action": "SELL",
    "Account": "ACC001",
    "Security": "AAPL",
    "Quantity": 25,
  }
  // ...
]
```