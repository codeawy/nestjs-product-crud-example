/**
 * Standard API response interface
 *
 * Defines the structure for consistent API responses across the application.
 *
 * @interface ApiResponse
 * @template T - Type of the data payload
 */
export interface ApiResponse<T = any> {
  /** Indicates if the request was successful */
  success: boolean;

  /** Human-readable message describing the result */
  message: string;

  /** The actual data payload */
  data: T;

  /** ISO timestamp of the response */
  timestamp: string;
}

/**
 * Paginated API response interface
 *
 * Extends the standard API response with pagination metadata.
 *
 * @interface PaginatedApiResponse
 * @template T - Type of the data payload
 */
export interface PaginatedApiResponse<T = any> extends ApiResponse<T[]> {
  /** Pagination metadata */
  pagination: {
    /** Current page number */
    currentPage: number;

    /** Number of items per page */
    itemPerPage: number;

    /** Total number of items */
    totalItems: number;

    /** Total number of pages */
    totalPages: number;

    /** Whether there is a next page */
    hasNextPage: boolean;

    /** Whether there is a previous page */
    hasPreviousPage: boolean;
  };

  /** Applied filters information */
  filters: {
    /** Applied category filter */
    category: string;

    /** Applied price range filter */
    priceRange: {
      /** Minimum price */
      min: number;

      /** Maximum price or 'unlimited' */
      max: number | 'unlimited';
    };

    /** Applied search term */
    search: string;
  };
}

/**
 * Product update response interface
 *
 * Specific response interface for product update operations.
 *
 * @interface ProductUpdateResponse
 */
export interface ProductUpdateResponse extends ApiResponse {
  /** List of fields that were updated */
  updatedFields: string[];
}
