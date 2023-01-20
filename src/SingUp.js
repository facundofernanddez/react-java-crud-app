import { InputText } from "primereact/inputtext";

export const SingUp = () => {
  return;
  <>
    <span className="p-float-label">
      <InputText
        id="in"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label htmlFor="in">Username</label>
    </span>
  </>;
};
