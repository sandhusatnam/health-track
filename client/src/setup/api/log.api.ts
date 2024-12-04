import axios from "@/lib/axios";
import { Goal, Log, UserProgress } from "../types";
import { GoalAPI, LogAPI } from "../urls";

export const fetchUserProgress = async (userId: string) => {
  try {
    const { data } = await axios.get<UserProgress[]>(
      `${LogAPI.GET_USER_PROGRESS}${userId}`,
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const logActivity = async (log: Log) => {
  try {
    const { data } = await axios.post<Log>(`${LogAPI.LOG_ACTIVITY}`, log);

    return data;
  } catch (error) {
    return null;
  }
};

export const fetchLogs = async (userId: string) => {
  try {
    const { data } = await axios.get<Log[]>(`${LogAPI.FETCH_LOGS}${userId}`);

    return data;
  } catch (error) {
    return null;
  }
};

export const deleteLog = async (id: string) => {
  try {
    const { data } = await axios.delete<boolean>(`${LogAPI.DELETE_LOG}${id}`);

    return data;
  } catch (error) {
    return null;
  }
};

export const saveGoal = async (goal: Goal) => {
    try {
      const { data } = await axios.post<Goal>(`${GoalAPI.ADD_GOAL}`, goal);
  
      return data;
    } catch (error) {
      return null;
    }
  };
  
  export const fetchGoals = async (userId: string) => {
    try {
      const { data } = await axios.get<Goal[]>(`${GoalAPI.FETCH_GOALS}${userId}`);
  
      return data;
    } catch (error) {
      return null;
    }
  };
  
  export const deleteGoal = async (id: string) => {
    try {
      const { data } = await axios.delete<boolean>(`${GoalAPI.DELETE_GOAL}${id}`);
  
      return data;
    } catch (error) {
      return null;
    }
  };
  
  