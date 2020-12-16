import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Button, Form, Message, Popup } from "semantic-ui-react";
import { REGISTER_USER } from "../utils/graphql";
import { useMutation } from "@apollo/client";

export default function Register(props) {
  // const [confirmPassword, setConfirmPassword] = useState({
  //   confirmPassword: "",
  // });
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
  });

  // const confirmPasswordHandle = (e) => {
  //   setConfirmPassword({ ...confirmPassword, [e.target.name]: e.target.value });
  // };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
      props.history.push("/");
    },
    onError(error) {
      setErrors(
        error.graphQLErrors[0].extensions.exception.output.payload.error
      );
      console.log(error.graphQLErrors[0].extensions.exception.output);
      console.log(errors);
    },
    variables: values,
  });

  function registerUser() {
    // const matchPassword =
    //   values.password === confirmPassword.confirmPassword ? true : false;
    //matchPassword ? addUser() : console.log(`passwords don't match `);
    addUser();
  }
  const styles = {
    container: {
      width: 400,
      margin: "auto",
    },
    form: {
      marginTop: 50,
    },
    title: {
      marginBottom: 20,
      textAlign: "center",
    },
    button: {
      marginTop: 20,
    },
  };

  return (
    <div style={styles.container}>
      <Form
        onSubmit={onSubmit}
        noValidate
        className={loading ? "loading" : ""}
        style={styles.form}
      >
        <h1 style={styles.title}>Register</h1>
        <Form.Input
          icon="user"
          iconPosition="left"
          label={values.username.length ? "Username" : ""}
          placeholder="Username.."
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          icon="mail"
          iconPosition="left"
          label={values.email.length ? "Email" : ""}
          placeholder="Email.."
          type="text"
          name="email"
          value={values.email}
          onChange={onChange}
        />
        <Popup
          wide
          inverted
          on={["click"]}
          trigger={
            <Form.Input
              icon="lock"
              iconPosition="left"
              label={values.password.length ? "Password" : ""}
              placeholder="Password.."
              type="password"
              name="password"
              value={values.password}
              onChange={onChange}
            />
          }
        >
          Minimal 6 characters long, Uppercase & Lowercase Letter.
        </Popup>
        {/* <Form.Input
          icon="lock"
          iconPosition="left"
          label={confirmPassword.confirmPassword.length ? "Confirm Password" : ""}
          placeholder="Confirm Password.."
          type="password"
          name="confirmPassword"
          value={confirmPassword.confirmPassword}
          onChange={confirmPasswordHandle}
        /> */}
        <Button onSubmit={onSubmit} fluid size="large" style={styles.button}>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <Message
          error
          header="There was some errors with your submission"
          list={Object.values({ errors })}
        />
      )}
    </div>
  );
}
