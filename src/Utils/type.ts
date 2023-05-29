export type Notification = {
  id: string;
  title: string;
  content: string;
  type: "loading" | "info" | "error" | "complete" | string;
  action: Function;
  actionText?: string;
};

export type Class = {
  createdAt: string;
  endTime: string;
  id: string;
  name: string;
  startTime: string;
  subject: string;
  updatedAt: string;
  day: number;
};