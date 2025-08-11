export interface Task {
  id: number | null;
  title: string;
  description?: string;
  status?: string;
  creationDate?: string;  // use string para datas em JSON
  projectId: number;
}
