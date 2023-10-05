export interface ICategory {
  //   id: number;
  //   name: string;
  //   slug: string;
  //   parent_id: number | null;
  //   logo: string | null;
  //   status: number | null;
  //   created_at: string | null;
  //   updated_at: string | null;
  id: number;
  name: string;
  icon: string;
  parentId?: number | null; // Make parentId optional if it can be null in GraphQL
}
