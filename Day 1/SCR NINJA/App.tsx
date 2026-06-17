import React, { useReducer, useState, useEffect, useRef, createContext, useContext } from 'react';

// ============================================================================
// EXERCISE 1: MANAGING USER PROFILE WITH useReducer
// ============================================================================
interface Profile {
  name: string;
  bio: string;
}

type ProfileStatus = 'initial' | 'loading' | 'success' | 'error';

interface ProfileState {
  status: ProfileStatus;
  profile: Profile | null;
  error: string | null;
}

type ProfileAction =
  | { type: 'SET_LOADING' }
  | { type: 'UPDATE_SUCCESS'; payload: Profile }
  | { type: 'UPDATE_FAILURE'; payload: string };

const initialProfileState: ProfileState = {
  status: 'initial',
  profile: null,
  error: null,
};

function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, status: 'loading', error: null };
    case 'UPDATE_SUCCESS':
      return { ...state, status: 'success', profile: action.payload, error: null };
    case 'UPDATE_FAILURE':
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
}

export function UserProfile() {
  const [state, dispatch] = useReducer(profileReducer, initialProfileState);

  function simulateUpdate(shouldSucceed: boolean): void {
    dispatch({ type: 'SET_LOADING' });
    setTimeout(() => {
      if (shouldSucceed) {
        dispatch({ type: 'UPDATE_SUCCESS', payload: { name: 'Alex', bio: 'Full Stack Engineer' } });
      } else {
        dispatch({ type: 'UPDATE_FAILURE', payload: 'Failed to sync profile changes with server.' });
      }
    }, 1200);
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px', margin: '15px 0' }}>
      <h3>Exercise 1: User Profile Engine</h3>
      <p>Status: <strong>{state.status}</strong></p>
      {state.status === 'loading' && <div>Saving updates...</div>}
      {state.status === 'error' && <div style={{ color: 'red' }}>Error: {state.error}</div>}
      {state.status === 'success' && state.profile && (
        <div style={{ background: '#f0fdf4', padding: '10px', borderRadius: '4px' }}>
          <strong>Name:</strong> {state.profile.name} <br />
          <strong>Bio:</strong> {state.profile.bio}
        </div>
      )}
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={() => simulateUpdate(true)}>Simulate Success</button>
        <button onClick={() => simulateUpdate(false)}>Simulate Failure</button>
      </div>
    </div>
  );
}

// ============================================================================
// EXERCISE 2: MANAGING SURVEY FEEDBACK WITH useReducer
// ============================================================================
type SurveyStatus = 'initial' | 'submitting' | 'completed';

interface SurveyState {
  status: SurveyStatus;
  feedback: string;
}

type SurveyAction =
  | { type: 'START_SURVEY' }
  | { type: 'SET_FEEDBACK'; payload: string }
  | { type: 'SUBMIT_SURVEY' }
  | { type: 'RESET_SURVEY' };

const initialSurveyState: SurveyState = {
  status: 'initial',
  feedback: '',
};

function surveyReducer(state: SurveyState, action: SurveyAction): SurveyState {
  switch (action.type) {
    case 'START_SURVEY':
      return { ...state, status: 'submitting' };
    case 'SET_FEEDBACK':
      return { ...state, feedback: action.payload };
    case 'SUBMIT_SURVEY':
      return { ...state, status: 'completed' };
    case 'RESET_SURVEY':
      return initialSurveyState;
    default:
      return state;
  }
}

export function SurveyFeedback() {
  const [state, dispatch] = useReducer(surveyReducer, initialSurveyState);

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px', margin: '15px 0' }}>
      <h3>Exercise 2: Survey Feedback Form</h3>
      
      {state.status === 'initial' && (
        <button onClick={() => dispatch({ type: 'START_SURVEY' })}>Start Survey</button>
      )}

      {state.status === 'submitting' && (
        <div>
          <textarea
            value={state.feedback}
            onChange={(e) => dispatch({ type: 'SET_FEEDBACK', payload: e.target.value })}
            placeholder="Please leave your input here..."
            style={{ width: '100%', minHeight: '60px', display: 'block', marginBottom: '10px' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => dispatch({ type: 'SUBMIT_SURVEY' })} disabled={!state.feedback.trim()}>
              Submit Survey
            </button>
            <button onClick={() => dispatch({ type: 'RESET_SURVEY' })}>Reset</button>
          </div>
        </div>
      )}

      {state.status === 'completed' && (
        <div>
          <p style={{ color: 'green' }}>✓ Survey submitted successfully!</p>
          <p><strong>Your Input:</strong> {state.feedback}</p>
          <button onClick={() => dispatch({ type: 'RESET_SURVEY' })}>Restart Form</button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// EXERCISE 3: MANAGING COMPLEX FORM STATE WITH useReducer
// ============================================================================
interface FormState {
  name: string;
  email: string;
  message: string;
}

type FormAction =
  | { type: 'UPDATE_FIELD'; payload: { field: keyof FormState; value: string } }
  | { type: 'RESET_FORM' };

const initialFormState: FormState = {
  name: '',
  email: '',
  message: '',
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

export function ContactForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { field: e.target.name as keyof FormState, value: e.target.value },
    });
  }

  function handleFormSubmit(e: React.FormEvent): void {
    e.preventDefault();
    console.log('Submitted Payload:', state);
    alert('Form dispatched! Check output log.');
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px', margin: '15px 0' }}>
      <h3>Exercise 3: Complex Contact Form</h3>
      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: '8px' }}>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <textarea
            name="message"
            value={state.message}
            onChange={handleInputChange}
            placeholder="Message Body"
            style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit">Submit Form</button>
          <button type="button" onClick={() => dispatch({ type: 'RESET_FORM' })}>Reset Fields</button>
        </div>
      </form>
    </div>
  );
}

// ============================================================================
// EXERCISE 4: USING useContext FOR GLOBAL STATE MANAGEMENT
// ============================================================================
interface Contact {
  id: string;
  name: string;
}

interface ContactState {
  contacts: Contact[];
}

type ContactAction =
  | { type: 'addContact'; payload: string }
  | { type: 'removeContact'; payload: string };

const initialContactState: ContactState = {
  contacts: [],
};

function contactReducer(state: ContactState, action: ContactAction): ContactState {
  switch (action.type) {
    case 'addContact':
      return { contacts: [...state.contacts, { id: Date.now().toString(), name: action.payload }] };
    case 'removeContact':
      return { contacts: state.contacts.filter((c) => c.id !== action.payload) };
    default:
      return state;
  }
}

interface ContactContextType {
  state: ContactState;
  dispatch: React.Dispatch<ContactAction>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(contactReducer, initialContactState);
  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
}

function useContacts(): ContactContextType {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider framework context.');
  }
  return context;
}

export function ContactList() {
  const { state, dispatch } = useContacts();
  const [nameInput, setNameInput] = useState<string>('');

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (!nameInput.trim()) return;
    dispatch({ type: 'addContact', payload: nameInput });
    setNameInput('');
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px', margin: '15px 0' }}>
      <h3>Exercise 4: Global Contacts (Context API)</h3>
