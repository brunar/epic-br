"use client";
import { ErrorBoundary } from "react-error-boundary";

const OnlineForm = () => {
  //   function logFormData(formData: FormData) {
  //     console.log(Object.fromEntries(formData));
  //   }
  return (
    <>
      {/* attribute action in the form
    action="api/onbording" 
    method="POST"

    // ***********
    action={logFormData}

    */}
      <form className="flex flex-col gap-4">
        <input name="orgId" type="hidden" value="123" />

        <div>
          <label htmlFor="accountTypeSelection">Account Type:</label>
          <select
            id="accountTypeSelection"
            name="accountType"
            className="border-2 border-black"
            defaultValue="Student"
          >
            <option value="">--Please select an option--</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="student">Student</option>
          </select>
        </div>
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
            defaultValue="18" // Independ of a number or string will always return a string
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
          <input
            id="colorInput"
            name="color"
            type="color"
            defaultValue="#f60000"
          />
        </div>
        <fieldset>
          <legend>Visibility:</legend>
          <label>
            <input
              name="visibility"
              type="radio"
              value="public"
              defaultChecked
            />
            Public
          </label>
          <label>
            <input name="visibility" type="radio" value="private" />
            Private
          </label>
        </fieldset>
        <div>
          <label>
            <input
              name="waiver"
              type="checkbox"
              className="border-2 border-black"
              defaultChecked
            />
            Waiver Signed
          </label>
        </div>
        <div>
          <label htmlFor="startDateInput">Start Date:</label>
          <input
            id="startDateInput"
            name="startDate"
            type="date"
            defaultValue="2004-05-06"
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

const FormPage = () => {
  //   function logFormData(formData: FormData) {
  //     console.log(Object.fromEntries(formData));
  //   }

  function ErrorFallback(props: FallbackProps) {
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{props.error.message}</pre>
    </div>;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <OnlineForm />
    </ErrorBoundary>
  );
};
export default FormPage;
