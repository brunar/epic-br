"use client";

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string; // optional prop
}

const Button = (props: ButtonProps) => {
  const { label, ...otherProps } = props;

  return <button {...otherProps}>{label}</button>;
};

const PageGreeting = () => {
  const Greeting = ({ name }: { name: string }) => {
    return <h1>Hello, {name}!</h1>;
  };

  const Message = ({
    classCustom,
    children,
  }: {
    classCustom: string;
    children: React.ReactNode;
  }) => {
    return <h1 className={classCustom}>{children}</h1>;
  };

  const buttonProps = {
    label: "Click Me",
    onClick: () => alert("Button clicked!"),
    className: "custom-button",
  };

  return (
    <>
      <Greeting name="World" />
      <Message classCustom="bruna">Message Text</Message>
      <br />
      {/* Spread props to Button component */}
      Spread Props matter the ordering.<br />
      Example className in the button<br />
      <Button {...buttonProps} className="override" />
    </>
  );
};

export default PageGreeting;
