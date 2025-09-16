export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: 'not-started' | 'ongoing' | 'completed';
  createdAt: Date;
}

export type Status = 'not-started' | 'ongoing' | 'completed';

export interface Column {
  id: Status;
  title: string;
}