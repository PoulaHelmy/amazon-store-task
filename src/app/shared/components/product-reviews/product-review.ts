import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { ReviewData, ReviewHelpers } from '../../models/review.model';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [TranslateModule, SkeletonModule],
  templateUrl: './product-reviews.html',
  styleUrl: './product-reviews.scss',
})
export class ProductReviews implements OnInit {
  @Input() productId!: number;

  reviews: ReviewData[] = [];
  loading = true;
  errorMsg = '';

  private Subscription!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.Subscription = this.http
      .get<ReviewData[]>('/assets/data/reviews.json')
      .subscribe(
        (data) => {
          this.reviews = data.filter((r) => r.product_id == this.productId);
          this.loading = false;
        },
        (err) => {
          this.errorMsg = 'Failed to load reviews. Please try again.';
          this.loading = false;
        }
      );
  }

  getReviewCount(): number {
    return this.reviews.length;
  }

  getAverageRating() {
    if (this.reviews.length === 0) return 0;
    const total = this.reviews.reduce((acc, r) => acc + r.Rating, 0);
    return Math.round((total / this.reviews.length) * 10) / 10;
  }

  formatDate(date: string): string {
    const locale = localStorage.getItem('locale') || 'en-US';
    return new Date(date).toLocaleDateString(locale);
  }

  getStars(rating: number): boolean[] {
    return ReviewHelpers.getStarArray(rating);
  }

  getSeverity(rating: number): string {
    return ReviewHelpers.getSeverityLabel(rating);
  }
}
