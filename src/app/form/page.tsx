const FormPage = () => {
  return (
    <>
      {/* attribute action in the form
    action="api/onbording" */}
      <form className="flex flex-col gap-4">
        <div>
          {/* hmlFor and id - make it show on screen reader*/}
          <label htmlFor="usernameInput">Username:</label>
          <input
            id="usernameInput"
            name="username"
            type="text"
            className="border-2 border-black"
          />
        </div>

        <div>
          <button type="submit" className="bg-black text-white p-2 inline-flex">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default FormPage;
