import React, { useState } from "react";
import { Button, Container, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUserSlice } from "../redux/slice/user";
import { nanoid } from "@reduxjs/toolkit";
import { CREATE_USER, UPDATE_USER_BY_ID } from "../redux/types";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const MyForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});

  const handleValidation = async () => {
    try {
      await validationSchema.validate(user, { abortEarly: false });
      setFormErrors({});
      return true;
    } catch (error) {
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setFormErrors(errors);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (await handleValidation()) {
      user.id === 0
        ? dispatch({ type: CREATE_USER, user: { ...user, id: nanoid(8) } })
        : dispatch({ type: UPDATE_USER_BY_ID, user });

      dispatch(
        setUserSlice({
          id: 0,
          name: "",
          email: "",
          password: "",
        })
      );
    }
  };

  const handleChange = (prop) => (event) => {
    dispatch(setUserSlice({ ...user, [prop]: event.target.value }));
  };

  return (
    <>
      <Container>
        <Input value={user.id} fullWidth disabled />
        <Input
          onChange={handleChange("name")}
          placeholder="Enter Name"
          value={user.name}
          fullWidth
        />
        {formErrors.name && (
          <div style={{ color: "red" }}>*{formErrors.name}</div>
        )}
        <Input
          onChange={handleChange("email")}
          placeholder="Enter Email"
          value={user.email}
          fullWidth
        />
        {formErrors.email && (
          <div style={{ color: "red" }}>*{formErrors.email}</div>
        )}
        <Input
          type="password"
          onChange={handleChange("password")}
          placeholder="Enter Password"
          value={user.password}
          fullWidth
        />
        {formErrors.password && (
          <div style={{ color: "red" }}>*{formErrors.password}</div>
        )}
        <Button onClick={() => handleSubmit()} variant="contained" fullWidth>
          Submit
        </Button>
      </Container>
    </>
  );
};

export default MyForm;
