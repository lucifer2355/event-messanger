import React from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../forms";
import { AddEventValues } from "../../store/event/types";
import { RootState } from "../../store/rootReducer";
import * as addEventActions from "../../store/event/eventAction";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .label("Title")
    .required(),
  message: Yup.string()
    .label("Message")
    .required(),
  email: Yup.string()
    .email()
    .label("Email To"),
});

const AddEventForm: React.FC = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state);

  const initialValue: AddEventValues = {
    title: "",
    message: "",
    dateTime: 0,
    email: "",
  };

  const handleSubmit: any = async (
    values: AddEventValues,
    { resetForm }: any
  ) => {
    await dispatch(addEventActions.createEvent(values));

    resetForm({});
  };

  return (
    <div className='event__form'>
      <Typography variant='h4' align='center' gutterBottom>
        Create Event
      </Typography>
      <Form
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormField
          label='Title'
          name='title'
          type='text'
          style={{ fontSize: "1.5rem" }}
        />
        <FormField
          label='Message'
          name='message'
          type='text'
          multiline={true}
          rows={4}
          style={{ fontSize: "1.5rem" }}
        />
        <FormField
          name='dateTime'
          type='date'
          variant='filled'
          style={{ fontSize: "1.5rem" }}
        />
        <FormField
          label='Recipient Email ID'
          name='email'
          type='email'
          style={{ fontSize: "1.5rem" }}
        />

        <SubmitButton title='Save' />
      </Form>
    </div>
  );
};

export default AddEventForm;
