import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from './todo/todo.entity';

export const databaseConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    // Cloud SQL configuration for production
    const instanceConnectionName = process.env.INSTANCE_CONNECTION_NAME;
    if (!instanceConnectionName) {
      throw new Error('INSTANCE_CONNECTION_NAME environment variable is required in production');
    }

    return {
      type: 'mysql',
      host: `/cloudsql/${instanceConnectionName}`,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Todo],
      synchronize: true, // Set to false in production and use migrations
      ssl: false, // Cloud SQL handles SSL internally
      extra: {
        socketPath: `/cloudsql/${instanceConnectionName}`,
      },
    };
  } else {
    // Local development configuration
    return {
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'todo_db',
      entities: [Todo],
      synchronize: true, // Auto-create tables in development
    };
  }
};
