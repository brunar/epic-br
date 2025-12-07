const PageCalculator = () => {
  const operations = {
    "+": (left: number, right: number): number => left + right,
    "-": (left: number, right: number): number => left - right,
    "*": (left: number, right: number): number => left * right,
    "/": (left: number, right: number): number => left / right,
    "**": (left: number, right: number): number => left ** right,
    "%": (left: number, right: number): number => left % right,
  };

  // This means (?) optional props
  type CalculatorProps = {
    left?: number;
    operator?: keyof typeof operations; // or Narrow Types '+' | '-' | '*' | '/';
    right?: number;
  };

  // Props with default values
  function Calculator({
    left = 0,
    operator = "+",
    right = 0,
  }: CalculatorProps) {
    const result = operations[operator](left, right);
    return (
      <div>
        <code>
          {left} {operator} {right} = <output>{result}</output>
        </code>
      </div>
    );
  }

  return (
    <div>
      <h1>Calculator</h1>
      <br />
      <p>Props with default values</p>
      <Calculator left={1} operator="+" right={2} />
      <Calculator operator="-" />
      <Calculator left={1} operator="*" />
      <Calculator operator="/" right={2} />

      <br />
      
      <Calculator left={1} operator="+" right={2} />
      <Calculator left={1} operator="-" right={2} />
      <Calculator left={1} operator="*" right={2} />
      <Calculator left={1} operator="/" right={2} />
      <Calculator left={1} operator="**" right={2} />
      <Calculator left={10} operator="%" right={100} />
    </div>
  );
};

export default PageCalculator;
