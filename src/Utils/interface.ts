export interface User {
    createdAt: string;
  email: string;
  id: string;
  name: string;
  password: string;
  role: string;
  uid: string;
  updatedAt: string;
}

export interface LayoutProps {
    children: React.ReactNode;
}