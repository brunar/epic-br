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
          <label htmlFor="passwordInput">Password:</label>
          <input
            id="passwordInput"
            name="password"
            type="password"
            className="border-2 border-black"
          />
        </div>
        <div>
          <label htmlFor="ageInput">Age:</label>
          <input
            id="ageInput"
            name="age"
            type="number"
            min="0"
            max="200"
            className="border-2 border-black"
          />
        </div>
        <div>
          <label htmlFor="photoInput">Photo:</label>
          <input
            id="photoInput"
            name="photo"
            type="file"
            accept="image/*"
            className="border-2 border-black"
          />
        </div>
        <div>
          <label htmlFor="colorInput">Favorite Color:</label>
          <input id="colorInput" name="color" type="color" />
        </div>
        <div>
          <label htmlFor="startDateInput">Start Date:</label>
          <input id="startDateInput" name="startDate" type="date" />
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
