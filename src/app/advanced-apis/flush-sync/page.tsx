'use client';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

function EditableText({
  id,
  initialValue = '',
  fieldName,
  inputLabel,
  buttonLabel,
}: {
  id?: string;
  initialValue?: string;
  fieldName: string;
  inputLabel: string;
  buttonLabel: string;
}) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  // 🐨 add a button ref here
  const buttonRef = useRef<HTMLInputElement>(null);

  return edit ? (
    <form
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        // here's where you'd send the updated value to the server
        // 🐨 wrap these calls in a flushSync
        flushSync(() => {
          setValue(inputRef.current?.value ?? '');
          setEdit(false);
        });
        // 🐨 after flushSync, focus the button with the button ref
        buttonRef.current?.focus();
      }}
    >
      <input
        required
        ref={inputRef}
        type="text"
        id={id}
        aria-label={inputLabel}
        name={fieldName}
        defaultValue={value}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            // 🐨 wrap this in a flushSync
            flushSync(() => {
              setEdit(false);
            });
            // 🐨 after the flushSync, focus the button
            buttonRef.current?.focus();
          }
        }}
        onBlur={(event) => {
          // 🐨 wrap these in a flushSync
          flushSync(() => {
            setValue(event.currentTarget.value);
            setEdit(false);
          });
          // 🐨 after the flushSync, focus the button
          buttonRef.current?.focus();
        }}
      />
    </form>
  ) : (
    <button
      aria-label={buttonLabel}
      // 🐨 add a ref prop for the button
      //Fix the type error by asserting the type of the ref
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={() => {
        // 🐨 wrap this in a flushSync
        flushSync(() => {
          setEdit(true);
        });
        // 🐨 after the flushSync, select all the text of the input
        inputRef.current?.select();
      }}
    >
      {value || 'Edit'}
    </button>
  );
}

function PageFlushSync() {
  return (
    <>
      <h2>flushSync </h2>
      <p>From React DOM</p>
      <ul className="mb-4">
        <li>Focus on button Unamed when input submit [Enter key]</li>
        <li>
          Focus on button Unamed on input blur (to blur click on [tab key] after
          editing input)
        </li>
        <li>Focus on button Unamed when input escape key [ESC]</li>
        <li>Focus on Input if click on Button</li>
      </ul>
      <div className="flex flex-col gap-4">
        <button>First button - focus before</button>

        <div>
          <EditableText
            initialValue="Unnamed Button"
            fieldName="name"
            inputLabel="Edit project name"
            buttonLabel="Edit project name"
          />
        </div>

        <button>Last button - focus after</button>
      </div>
    </>
  );
}

export default PageFlushSync;
