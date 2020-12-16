import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useForm } from "../hooks/useForm";
import { LOGIN_USER } from "../utils/graphql";

export default function Login(props) {
  const [errors, setErrors] = useState({})
  const { values, onChange, onSubmit } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log(result);
      props.history.push("/");
    },
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
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
        <h1 style={styles.title}>Login</h1>
        {/* <Transition.Group duration={200}>
        {values.username.length ? <Label color="black" >username</Label>: null}
        </Transition.Group> */}
        
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
          icon="lock"
          iconPosition="left"
          label={values.password.length ? "password" : ""}
          placeholder="Password.."
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
        />

        <Button onSubmit={onSubmit} fluid size="large" style={styles.button}>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <Message
          error
          header="There was some errors with your submission"
          list={Object.values(errors).map((value) => value)}
        />
      )}
    </div>
  );
}
