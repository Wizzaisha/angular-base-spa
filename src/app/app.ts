import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from './shared/services/theme/theme.service';
import { AppState } from './shared/store/app.reducer';
import { Module1Actions } from './pages/module1/store/actions.types';
import { selectTheme } from './pages/module1/store/selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-base2';

  currentTheme!: 'light' | 'dark';

  constructor(
    private store: Store<AppState>,
    private themeService: ThemeService
  ) {}

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.selectStoreData();
    this.initialConfig();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectStoreData(): void {
    this.store
      .select(selectTheme)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => (this.currentTheme = data));
  }

  initialConfig(): void {
    const theme = this.themeService.getCurrentTheme();

    if (theme) {
      this.store.dispatch(
        Module1Actions.setTheme({
          theme: theme,
        })
      );
    }
  }
}
