process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let popsicle = {
    name: "popsicle",
    price: "1.45"
};

beforeEach(function () {
    items.push(popsicle);
});

afterEach(function () {
    items.length = 0;
});

describe("GET /items", function () {
    test("Gets a list of items", async function () {
        const resp = await request(app).get(`/items`);

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([popsicle]);
    });
});

describe("POST /items", function () {
    test("Adds an item to the list", async function () {
        const resp = await request(app).post(`/items`)
            .send({
                name: "Pizza",
                price: "3.99"
            });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: `Pizza added successfully` });
    });
});

describe("GET /items/item_name", function () {
    test("Responds with the correct item", async function () {
        const resp = await request(app).get(`/items/popsicle`);

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            name: "popsicle",
            price: "1.45"
        });
    });
});

describe("PATCH /items/item_name", function () {
    test("Correctly updates an item", async function () {
        const resp = await request(app).patch(`/items/popsicle`)
            .send({
                name: "Cucumbers"
            });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            updated: {
                name: "Cucumbers",
                price: "1.45"
            }
        });
    });
});

describe("DELETE /items/item_name", function () {
    test("Correctly deletes an item", async function () {
        const resp = await request(app).delete(`/items/popsicle`);

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });
});