import React, { useState } from "react";
import {
  Typography,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../forms";
import { AddEventValues } from "../../store/addEvent/types";
import { RootState } from "../../store/rootReducer";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .label("Title")
    .required(),
  message: Yup.string()
    .label("Message")
    .required(),
  emailFrom: Yup.string()
    .email()
    .label("Email From"),
  emailTo: Yup.string()
    .email()
    .label("Email To"),
  phoneNoFrom: Yup.number().label("Phone No. From"),
  phoneNoTo: Yup.number().label("Phone No. To"),
  platforms: Yup.array().label("Platforms"),
});

const AddEventForm: React.FC = () => {
  const { auth } = useSelector((state: RootState) => state);
  const [isWhatsApp, setIsWhatsApp] = useState<boolean>(false);
  const [isMail, setIsMail] = useState<boolean>(false);
  const [platforms, setPlatforms] = useState([
    { isWhatsApp: isWhatsApp },
    { isMail: isMail },
  ]);

  const initialValue: AddEventValues = {
    title: "",
    message: "",
    emailFrom: "",
    emailTo: "",
    phoneNoFrom: null,
    phoneNoTo: null,
    platforms: platforms,
  };

  const handleSubmit: any = (values: AddEventValues) => {
    console.log("Add event values", values);
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

        <Typography variant='inherit' className='event__form__typography'>
          Select platforms ( when you send the message on!)
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={isWhatsApp}
              onChange={() => setIsWhatsApp((preState) => !preState)}
              name='isWhatsApp'
              color='primary'
            />
          }
          label='WhatsApp'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isMail}
              onChange={() => setIsMail((preState) => !preState)}
              name='isMail'
              color='primary'
            />
          }
          label='Mail'
        />

        <FormField
          label='Your Email ID'
          name='emailFrom'
          type='email'
          style={{ fontSize: "1.5rem" }}
        />
        <FormField
          label='Receiver Email Id'
          name='emailTo'
          type='email'
          style={{ fontSize: "1.5rem" }}
        />
        <FormField
          label='Your Phone No.'
          name='phoneNoFrom'
          type='number'
          style={{ fontSize: "1.5rem" }}
        />
        <FormField
          label='Receiver Phone No.'
          name='phoneNoTo'
          type='number'
          style={{ fontSize: "1.5rem" }}
        />

        <SubmitButton title='Save' />
      </Form>
    </div>
  );
};

export default AddEventForm;
