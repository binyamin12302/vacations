import dotenv from "dotenv";
dotenv.config();

if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";

class Config {
  public isDevelopment = process.env.NODE_ENV === "development";
  public isProduction = process.env.NODE_ENV === "production";
  public port = 0; // Node/Express
  public sqlPort = 0;
  public sqlHost = "";
  public sqlUser = "";
  public sqlPassword = "";
  public sqlDatabase = "";
}

class DevelopmentConfig extends Config {
  public port = +(process.env.PORT || 3001); // Node/Express
  public sqlPort = +(process.env.SQL_PORT || 3306); // MySQL default port
  public sqlHost = process.env.SQL_HOST || "localhost";
  public sqlUser = process.env.SQL_USER || "root";
  public sqlPassword = process.env.SQL_PASSWORD || "";
  public sqlDatabase = process.env.SQL_DATABASE || "vacationproject";
}

class ProductionConfig extends Config {
  public port = +(process.env.PORT || 3000);
  public sqlPort = +(process.env.SQL_PORT || 26386); // MySQL
  public sqlHost = process.env.SQL_HOST || "";
  public sqlUser = process.env.SQL_USER || "";
  public sqlPassword = process.env.SQL_PASSWORD || "";
  public sqlDatabase = process.env.SQL_DATABASE || "";
}

const config =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
