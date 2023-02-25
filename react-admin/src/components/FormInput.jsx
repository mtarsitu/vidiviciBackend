import { TextField } from "@mui/material";
import { useState } from "react";
import { textFieldSx } from "../data/sx/textFieldsSx";
const FormInput = (props) => {
  const { label, onChange, id, regex, value, ...inputProps } = props;
  const [error, setError] = useState(false);
  const [helper, setHelper] = useState("");
  const onBlur = () => {
    setError(!value.match(regex));
    if (!value.match(regex)) {
      setHelper({ ...inputProps }["helperText"]);
    } else {
      setHelper("");
    }
  };
  return (
    <TextField
      margin="normal"
      required
      error={error}
      {...inputProps}
      fullWidth
      label={label}
      sx={textFieldSx}
      onChange={onChange}
      onBlur={onBlur}
      helperText={helper}
    />
  );
};

export default FormInput;
