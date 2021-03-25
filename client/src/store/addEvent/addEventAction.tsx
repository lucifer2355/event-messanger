import axios from "../../api/axios";
import {
  AddEventValues,
  ADD_EVENT_COMPLETE,
  ADD_EVENT_START,
  EventDispatch,
} from "./types";

const token = localStorage.getItem("token");

export const createEvent = (
  values: AddEventValues,
  platforms: object[]
): EventDispatch => async (dispatch) => {
  dispatch({ type: ADD_EVENT_START });

  console.log(values);
  console.log(platforms);

  const { data } = await axios.post(
    "/api/event",
    {
      title: values.title,
      message: values.message,
      dateTime: values.dateTime,
      emailFrom: values.emailFrom,
      emailTo: values.emailTo,
      phoneNoFrom: values.phoneNoFrom,
      phoneNoTo: values.phoneNoTo,
      platforms,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  console.log("response", data);

  dispatch({ type: ADD_EVENT_COMPLETE, payload: data });
  try {
  } catch (error) {
    console.warn("Add Event Error", error);
  }
};