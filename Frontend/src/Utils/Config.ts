class Config {
  public port = "";
  public registerUrl = "";
  public loginUrl = "";
  public vacationUrl = "";
  public vacationImageUrl = "";
  public followVacationUrl = "";
  public unfollowVacationUrl = "";
}

class DevelopmentConfig extends Config {
  public port = "http://localhost:3001/";
  public registerUrl = this.port + "api/auth/register/";
  public loginUrl = this.port + "api/auth/login/";
  public vacationUrl = this.port + "api/vacations/";
  public vacationImageUrl = this.port + "api/vacations/images/";
  public followVacationUrl = this.port + "api/auth/follow/";
  public unfollowVacationUrl = this.port + "api/auth/unfollow/";
}

class ProductionConfig extends Config {
  public port = "https://vacation-backend-7dsu.onrender.com/";
  public registerUrl = this.port + "api/auth/register/";
  public loginUrl = this.port + "api/auth/login/";
  public vacationUrl = this.port + "api/vacations/";
  public vacationImageUrl = this.port + "api/vacations/images/";
  public followVacationUrl = this.port + "api/auth/follow/";
  public unfollowVacationUrl = this.port + "api/auth/unfollow/";
}

const config =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
