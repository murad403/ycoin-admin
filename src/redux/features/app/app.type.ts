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
