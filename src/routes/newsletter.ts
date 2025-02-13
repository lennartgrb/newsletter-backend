import { Hono } from "hono";
import { Newsletter } from "../models/newsletter";

export const newsletter = new Hono();

newsletter.get("/", async (c) => {
  const newsletter = await Newsletter.findAll();

  return c.json(
    {
      data: newsletter,
    },
    200
  );
});

newsletter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const newsletter = await Newsletter.find(id);

  return c.json(
    {
      data: newsletter,
    },
    200
  );
});

newsletter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updatedNewsletter = await Newsletter.update(id, body);

    if (updatedNewsletter) {
      return c.json({ message: "Newsletter updated succesfully", data: updatedNewsletter }, 200);
    } else {
      return c.text("Newsletter not found or update failed", 404);
    }
  } catch (error) {
    console.error("Error updating newsletter:", error);
    return c.text("Internal Server Error", 500);
  }
});

newsletter.post("/", async (c) => {
  const body = await c.req.json();

  try {
    const newNewsletter = await Newsletter.create(body);

    if (newNewsletter) {
      return c.json({ message: "Subscriber added succesfully", data: newNewsletter }, 200);
    } else {
      return c.text("Subscriber not found or adding failed", 404);
    }
  } catch (error) {
    console.error("Error adding subscriber:", error);
    return c.text("Internal Server Error", 500);
  }
});

newsletter.delete("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const deleteNewsletter = await Newsletter.deleteNews(id);

    if (deleteNewsletter) {
      return c.json({ message: "Newsletter deleted succesfully", data: deleteNewsletter }, 200);
    } else {
      return c.text("Newsletter not found or deleting failed", 404);
    }
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    return c.text("Internal Server Error", 500);
  }
});
