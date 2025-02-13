import { Hono } from "hono";
import { Subscriber } from "../models/subscriber";

export const subscriber = new Hono();

subscriber.get("/", async (c) => {
  const subscribers = await Subscriber.findAll();

  return c.json(
    {
      data: subscribers,
    },
    200
  );
});

subscriber.get("/:id", async (c) => {
  const id = c.req.param("id");
  const subscriber = await Subscriber.find(id);

  return c.json(
    {
      data: subscriber,
    },
    200
  );
});

subscriber.get("/emails/", async (c) => {
  const emails = await Subscriber.findAllEmails();

  return c.json(
    {
      data: emails,
    },
    200
  );
});

subscriber.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updatedSubscriber = await Subscriber.update(id, body);

    if (updatedSubscriber) {
      return c.json({ message: "Subscriber updated succesfully", data: updatedSubscriber }, 200);
    } else {
      return c.text("Subscriber not found or update failed", 404);
    }
  } catch (error) {
    console.error("Error updating subscriber:", error);
    return c.text("Internal Server Error", 500);
  }
});

subscriber.post("/", async (c) => {
  const body = await c.req.json();

  try {
    const newSubscriber = await Subscriber.create(body);

    if (newSubscriber) {
      return c.json({ message: "Subscriber added succesfully", data: newSubscriber }, 200);
    } else {
      return c.text("Subscriber not found or adding failed", 404);
    }
  } catch (error) {
    console.error("Error adding subscriber:", error);
    return c.text("Internal Server Error", 500);
  }
});

subscriber.delete("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const deleteSubscriber = await Subscriber.deleteSub(id);

    if (deleteSubscriber) {
      return c.json({ message: "Subscriber deleted succesfully", data: deleteSubscriber }, 200);
    } else {
      return c.text("Subscriber not found or deleting failed", 404);
    }
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return c.text("Internal Server Error", 500);
  }
});
