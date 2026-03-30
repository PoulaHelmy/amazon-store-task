import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card';
import { CartService } from '../../../core/services/cart.service';
import { Product, Category } from '../../../core/models/product.model';
import { AppConfigService } from '../../../core/services/app-config.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TranslateModule, ProductCardComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  providers: [CartService],
})
export class ProductListComponent implements OnInit {
  private readonly products = signal<Product[]>([]);
  readonly categories = signal<Category[]>([]);
  readonly selectedCategory = signal<string | null>(null);
  readonly loading = signal(true);

  readonly filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    const all = this.products();
    return cat ? all.filter(p => p.category === cat) : all;
  });

  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
    private readonly cartService: CartService,
    private readonly translate: TranslateService,
    private readonly configService: AppConfigService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory.set(params['category'] || null);
    });

    this.http.get<Product[]>('/assets/data/products.json').subscribe(data => {
      this.products.set(data);
      this.loading.set(false);
    });

    this.http.get<Category[]>('/assets/data/categories.json').subscribe(cats => {
      this.categories.set(cats);
    });
  }

  get currentLang(): string {
    return this.translate.currentLang || 'en';
  }

   formatPrice(price: number): string {
    const config = this.configService.get();
    return new Intl.NumberFormat(config.lang === 'ar' ? 'ar-EG' : 'en-US', {
      style: 'currency',
      currency: config.currency,
    }).format(price);
  }

  selectCategory(id: string | null): void {
    this.selectedCategory.set(id);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
