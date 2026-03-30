import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../../core/models/product.model';
import { AppConfigService } from '../../../core/services/app-config.service';

// Task 2: Implement this component to match the design spec.
// Required states: normal, on-sale, out-of-stock, new, featured, low-stock
// Use signals: input.required<T>(), output<T>(), computed()
// Support RTL layout
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly addToCart = output<Product>();

  private readonly configService = inject(AppConfigService);
  readonly config = computed(() => this.configService.config());

  readonly isOnSale = computed(() => {
    const p = this.product();
    return !!(p.originalPrice && p.originalPrice > p.price);
  });

  readonly isOutOfStock = computed(() => !this.product().inStock);

  readonly discount = computed(() => {
    const p = this.product();
    if (!p.originalPrice || p.originalPrice <= p.price) return 0;
    return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
  });

  readonly displayName = computed(() => {
    const p = this.product();
    const cfg = this.config();
    return cfg?.lang === 'ar' ? p.nameAr : p.name;
  });

  formatPrice(price: number): string {
    const config = this.configService.get();
    const locale = config.lang === 'ar' ? 'ar-EG' : 'en-US';
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: config.currency,
      maximumFractionDigits: 0,
    });
    return formatter
      .formatToParts(price)
      .map(({ value }) => value)
      .join('');
  }

  onAddToCart(): void {
    if (!this.isOutOfStock()) {
      this.addToCart.emit(this.product());
    }
  }
}
