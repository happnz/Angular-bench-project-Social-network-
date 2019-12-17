export interface SessionState {
  id;
  name;
  lastName;
}

export function createInitialState(): SessionState {
  return {
    id: -1,
    name: '',
    lastName: ''
  };
}
