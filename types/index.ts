export interface IEvent {
  id: string;
  type: string;
  public: boolean;
  created_at: string;
  org: {
    id: number;
    login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    push_id: number;
    size: number;
    distinct_size: number;
    ref: string;
    head: string;
    before: string;
    commits: any[];
  };
}

export type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
};
