import oracledb, { Connection } from 'oracledb';
import { env } from '../config/env';

export class DbHelper {
  private connection: Connection | null = null;

  async connect() {
    this.connection = await oracledb.getConnection({
      user: env.db.user,
      password: env.db.password,
      connectString: `${env.db.host}:${env.db.port}/${env.db.serviceName}`,
    });
  }

  async query<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T[]> {
    if (!this.connection) throw new Error('DbHelper not connected. Call connect() first.');
    const result = await this.connection.execute(sql, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return (result.rows ?? []) as T[];
  }

  async close() {
    await this.connection?.close();
    this.connection = null;
  }
}
