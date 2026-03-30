import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart.service';
import { PaymentConfigService } from '../../core/services/payment-config.service';
import { AppConfigService } from '../../core/services/app-config.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly paymentConfigService = inject(PaymentConfigService);
  private readonly configService = inject(AppConfigService);

  readonly items = computed(() => this.cartService.items());
  readonly total = computed(() => this.cartService.total());
  readonly itemCount = computed(() => this.cartService.itemCount());
  readonly paymentProviders = computed(() => this.paymentConfigService.providers());
  readonly config = computed(() => this.configService.config());

  readonly shippingCost = computed(() => (this.total() > 50 ? 0 : 5.99));
  readonly tax = computed(() => this.total() * 0.1);
  readonly grandTotal = computed(() => this.total() + this.shippingCost() + this.tax());

  formatPrice(price: number): string {
    const config = this.configService.get();
    const locale = config.lang === 'ar' ? 'ar-EG' : 'en-US';
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: config.currency,
      maximumFractionDigits: 0,
    });
    return formatter.formatToParts(price).map(({ value }) => value).join('');
  }

  updateQuantity(productId: number, delta: number): void {
    const item = this.items().find(i => i.productId === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + delta);
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}
