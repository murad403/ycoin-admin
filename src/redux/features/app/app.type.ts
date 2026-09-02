export interface TLegalDocumentResponse {
  id: number;
  document_type: string;
  document_type_display: string;
  content: string;
  updated_at: string;
}

export interface TUpdateLegalDocumentRequest {
  content: string;
}

export interface TUserItem {
  id: string;
  profile_name: string;
  email: string;
  avatar: string | null;
  role: string;
  role_display: string;
  is_email_verified: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TRetrieveUsersResponse {
  next: string | null;
  previous: string | null;
  results: TUserItem[];
  users_count: number;
}

export interface TRetrieveUsersQueryParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export interface TKnowledgeBaseItem {
  id: string;
  title: string;
  content: string;
  uploaded_by: string;
  uploaded_by_name: string;
  uploaded_by_email: string;
  created_at: string;
  updated_at: string;
}

export interface TRetrieveKnowledgeBasesResponse {
  next: string | null;
  previous: string | null;
  results: TKnowledgeBaseItem[];
  count?: number;
  kb_count?: number;
}

export interface TCreateKnowledgeBaseRequest {
  title: string;
  content: string;
}

export interface TUpdateKnowledgeBaseRequest {
  title: string;
  content: string;
}

export interface TRetrieveKnowledgeBasesQueryParams {
  page?: number;
  page_size?: number;
  search?: string;
}
