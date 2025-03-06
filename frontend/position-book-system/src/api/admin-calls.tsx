import { ENDPOINTS } from "./endpoints";
import { toast } from "sonner";

const testData = {
  Events: [
    {
      ID: 1,
      Action: "BUY",
      Account: "ACC1",
      Security: "SEC1",
      Quantity: 100,
    },
    {
      ID: 2,
      Action: "BUY",
      Account: "ACC1",
      Security: "SEC1",
      Quantity: 50,
    },
    {
      ID: 3,
      Action: "BUY",
      Account: "ACC1",
      Security: "SEC1",
      Quantity: 12,
    },
    {
      ID: 4,
      Action: "BUY",
      Account: "ACC1",
      Security: "SECXYZ",
      Quantity: 50,
    },
    {
      ID: 5,
      Action: "BUY",
      Account: "ACC2",
      Security: "SECXYZ",
      Quantity: 33,
    },
    {
      ID: 6,
      Action: "BUY",
      Account: "ACC1",
      Security: "SEC1",
      Quantity: 20,
    },
    {
      ID: 7,
      Action: "BUY",
      Account: "ACC1",
      Security: "SEC1",
      Quantity: 100,
    },
    {
      ID: 8,
      Action: "SELL",
      Account: "ACC1",
      Security: "SEC1",
      Quantity: 50,
    },
    {
      ID: 9,
      Action: "BUY",
      Account: "ACC1",
      Security: "SEC1",
      Quantity: 100,
    },
    {
      ID: 9,
      Action: "CANCEL",
      Account: "ACC1",
      Security: "SEC1",
      Quantity: 0,
    },
    {
      ID: 10,
      Action: "BUY",
      Account: "ACC1",
      Security: "SEC1",
      Quantity: 5,
    },
  ],
};


export const postPopulateDatabase = async () =>
  fetch(
    ENDPOINTS.admin.populateDatabase,
    Object.assign({
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(testData),
    })
  ).then((res) => {
    if (res.status !== 200) {
      toast.error("[ADMIN] - Error when populating the database");
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    toast.success("[ADMIN] - Database populated! You may need to change the page to see the changes.");
  });

export const getClearDatabase = async () =>
  fetch(
    ENDPOINTS.admin.clearDatabase,
    Object.assign({
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  ).then((res) => {
    if (res.status !== 204) {
      toast.error("[ADMIN] - Error when clearing the database");
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    toast.success("[ADMIN] - Database cleared! You may need to change the page to see the changes.");
  });
