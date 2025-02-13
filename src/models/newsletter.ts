import { getPool } from "../db/db";

export class Newsletter {
  static async findAll() {
    const result = await getPool().query("SELECT * FROM newsletter LIMIT 100");

    return result.rows;
  }

  static async find(id: string) {
    const values = [id];
    const result = await getPool().query("SELECT * FROM newsletter WHERE id = $1", values);

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async update(
    id: string,
    data: { created_at: string; updated_at: string; author: string; category: string; content: string }
  ) {
    const { created_at, updated_at, author, category, content } = data;
    const values = [created_at, updated_at, author, category, content, id];
    const result = await getPool().query(
      `UPDATE newsletter
        SET created_at = $1, updated_at = $2, author = $3, category = $4, content = $5
        WHERE id = $6
        RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async create(data: {
    created_at: string;
    updated_at: string;
    author: string;
    category: string;
    content: string;
  }) {
    const { created_at, updated_at, author, category, content } = data;
    const values = [created_at, updated_at, author, category, content];

    const result = await getPool().query(
      `INSERT INTO newsletter (created_at, updated_at, author, category, content)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async deleteNews(id: string) {
    const values = [id];

    const result = await getPool().query(
      `DELETE FROM newsletter 
      WHERE id = $1
      RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  }
}
