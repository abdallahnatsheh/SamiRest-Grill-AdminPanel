import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useField } from "formik";
import moment from "moment";
//component used to pick user birthday date
// Styles
const MyDatePicker = ({ name = "" }) => {
  const [field, meta, helpers] = useField(name);

  const { value } = moment(meta).format("YYYY-MM-DD");
  const { setValue } = helpers;
  return (
    <Datetime
      {...field}
      selected={value}
      onChange={(date) => setValue(date)}
      dateFormat="YYYY-MM-DD"
      timeFormat={false}
    />
  );
};
export default MyDatePicker;
