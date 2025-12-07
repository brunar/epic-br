// Component BOX
// Trim() is to cut last space (in the last box) like className="box "
function Box({
  size,
  ...otherprops
}: React.ComponentProps<"div"> & { size?: "small" | "medium" | "large" }) {
  console.log(otherprops);
  const sizeClassName = size ? `box--${size}` : "";

  return (
    // className={`box ${className} ${sizeClassName}`.trim()}
    // Array [].filter(Boolean).join(' ') to remove extra spaces in between
    // filter(boolean) removes false strings
    <div
      style={{ fontStyle: "italic", ...otherprops.style }}
      {...otherprops}
      className={["box", otherprops.className, sizeClassName]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

const smallBox = (
  <Box size="small" style={{ backgroundColor: "lightblue" }}>
    small lightblue box
  </Box>
);
const mediumBox = (
  <Box
    size="medium"
    style={{ fontStyle: "normal", backgroundColor: "pink" }}
  >
    medium pink box
  </Box>
);
const largeBox = (
  <Box size="large" style={{ backgroundColor: "orange" }}>
    large orange box
  </Box>
);
const sizelessColorlessBox = <Box>sizeless colorless box</Box>;

const PageStyle2 = () => {
  return (
    <>
      <div>
        {smallBox}
        {mediumBox}
        {largeBox}
        {sizelessColorlessBox}
      </div>

      {/* this gives error con console because is using tailwind project */}
      <style>
        {`
            .box {
                border: 1px solid #333;
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
            }
            .box--large {
                width: 270px;
                height: 270px;
            }
            .box--medium {
                width: 180px;
                height: 180px;
            }
            .box--small {
                width: 90px;
                height: 90px;
            }
        `}
      </style>
    </>
  );
};

export default PageStyle2;
