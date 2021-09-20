export interface AppState {
  title: string,
  error: boolean,
  variant: 'success' | 'error'
}

export type AppAction = | {type: 'fetchError'} |{ type:'fetchSuccess'; payload: string};
