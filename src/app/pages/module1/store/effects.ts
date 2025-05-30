import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Module1Actions } from './actions.types';
import { ThemeService } from '../../../shared/services/theme/theme.service';

@Injectable()
export class Module1Effects {
  private actions$ = inject(Actions);

  private themeService = inject(ThemeService);

  updateCurrentTheme$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(Module1Actions.setTheme),
        tap(({ theme }) => {
          document.documentElement.setAttribute('data-theme', theme);
          this.themeService.setTheme(theme);
        })
      );
    },
    { functional: true, dispatch: false }
  );
}
