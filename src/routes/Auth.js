import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
// import firebase from "fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  // 하나의 onChangeFunction으로 password와 email 의 변화를 한번에 가지고논다!

  const onChangeFunction = (event) => {
    // event에서 target의 name과 value를 꺼내는것. event.target.name event.target.value라 하지않고 이렇게함
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
      console.log("email");
    } else if (name === "password") {
      setPassword(value);
      console.log("password");
    }
  };
  const onSubmitFunction = async (event) => {
    event.preventDefault();
    let data;
    try {
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
      // 에러는 이상한 것들의 모임이다. 여기서 message만 딱 사용하면 된다.
      console.log(error);
    }
  };

  //<input type="submit" value={newAccount ? "Create Account" : "Log in"} />
  // newAccount가 로그인인지, 계정생성인지를 관장한다.
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmitFunction}>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={onChangeFunction}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangeFunction}
          required
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign in"}
        />
      </form>
      {error}
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          continue with google
        </button>
        <button onClick={onSocialClick} name="github">
          continue with gitHub
        </button>
      </div>
      Please Log in
    </div>
  );
};
export default Auth;
