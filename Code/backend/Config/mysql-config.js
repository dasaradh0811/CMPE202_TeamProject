const config = {
    HOST: "localhost",
    USER: "admin",
    PASSWORD: "admin",
    DB: "airportappdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }

export default config
  