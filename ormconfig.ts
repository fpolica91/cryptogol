
export default{
    type: 'postgres',
    host: 'localhost',  
    port: 5432,
    username: 'gol',
    password: 'gol',  
    database: 'cryptogol',
    entities: ['src/entities/**/*.ts'],
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
}