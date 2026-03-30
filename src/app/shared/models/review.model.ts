
export interface ReviewData {
  Id: number;
  Author: string;
  Rating: number;
  Comment: string;
  Date: string;
  product_id: number;
}

export interface PaginatedResponse {
  data: ReviewData[];
  total: number;
  page: number;
  pageSize: number;
}

export class ReviewHelpers {
  public static getStarArray(rating: number): boolean[] {
    var stars: boolean[] = [];
    for (var i = 0; i < 5; i++) {
      stars.push(i < rating ? true : false);
    }
    return stars;
  }

  public static getSeverityLabel(rating: number): string {
    if (rating >= 4) return 'success';
    if (rating >= 2) return 'warn';
    return 'danger';
  }
}
