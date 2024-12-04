export enum UserAPI {
  GET_USER_BY_EMAIL = "User/GetUserByEmail?email=",
  CREATE_USER = "User/CreateUser",
}

export enum LogAPI {
  GET_USER_PROGRESS = "Log/GetUserProgress?userId=",
  LOG_ACTIVITY = "Log/CreateActivityLog",
  FETCH_LOGS = "Log/GetActivityLogs?userId=",
  DELETE_LOG = "Log/DeleteLog?logId=",
}

export enum GoalAPI {
  ADD_GOAL = "Goal/CreateGoal",
  FETCH_GOALS = "Goal/GetUserGoals?userId=",
  DELETE_GOAL = "Goal/DeleteGoal?id=",
}

export enum FoodAPI {
  GET_CALORIE_INFO = "Food?food=",
}
