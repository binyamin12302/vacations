class Config {
  public port = ""
  public registerUrl = "";
  public loginUrl = "";
  public vacationUrl = "";
  public vacationImageUrl = "";
  public followVacationUrl = "";
  public unfollowVacationUrl = "";
}

class DevelopmentConfig extends Config {
  public port = "http://localhost:3001"
  public registerUrl = "http://localhost:3001/api/auth/register/";
  public loginUrl = "http://localhost:3001/api/auth/login/";
  public vacationUrl = "http://localhost:3001/api/vacations/";
  public vacationImageUrl = " http://localhost:3001/api/vacations/images/";
  public followVacationUrl = "http://localhost:3001/api/auth/follow/";
  public unfollowVacationUrl = "http://localhost:3001/api/auth/unfollow/";
}



class ProductionConfig extends Config {
  public port = "https://vacation-project-binyamin.herokuapp.com"
  public registerUrl = "https://vacation-project-binyamin.herokuapp.com/api/auth/register/";
  public loginUrl = "https://vacation-project-binyamin.herokuapp.com/api/auth/login/";
  public vacationUrl = "https://vacation-project-binyamin.herokuapp.com:/api/vacations/";
  public vacationImageUrl = "https://vacation-project-binyamin.herokuapp.com/api/vacations/images/";
  public followVacationUrl = "https://vacation-project-binyamin.herokuapp.com/api/auth/follow/";
  public unfollowVacationUrl = "https://vacation-project-binyamin.herokuapp.com/api/auth/unfollow/";
}


const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
