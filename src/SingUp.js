import { InputText } from "primereact/inputtext";
import { useState } from "react";

export const SingUpForm = () => {
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  //arreglar bien este formulario de registro

  return (
    <>
      <form action="/logincheck">
        <span className="p-float-label">
          <InputText
            id="username"
            name="username"
            value={value.username}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="username">Username</label>
          <InputText
            id="email"
            name="email"
            value={value.email}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <InputText
            id="password"
            name="password"
            value={value.password}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <InputText
            id="password2"
            name="password2"
            value={value.password2}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="password2">Repeat password</label>
        </span>
      </form>
    </>
  );
};
