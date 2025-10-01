export class QueryProductDto {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'name' | 'price' | 'createdAt';
  order?: 'ASC' | 'DESC';
}
