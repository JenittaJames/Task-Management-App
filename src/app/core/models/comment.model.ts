export interface Comment {
  id: string;
  taskId: string;
  text: string;
  createdAt: string;
  replies: Comment[];
}
