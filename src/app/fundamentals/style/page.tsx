"use client";

const PageStyle = () => {
  const myStyles = {
    marginTop: 20,
    backgroundColor: "orange",
    width: 100,
    height: 100,
  };

  return (
    <>
      <h3>Const styles applied</h3>
      <div style={myStyles} />
      <br />
      
      <h3>Inline styles applied</h3>
      <div style={{ backgroundColor: "green", width: 100, height: 100 }} />
      <br />

      <h3>Class-based styles applied</h3>
      <div className="my-class" />

      <style>
        {`
          .my-class {
            background-color: lightblue;
            width: 100px;
            height: 100px;
          }
        `}
      </style>
    </>
  );
};

export default PageStyle;
