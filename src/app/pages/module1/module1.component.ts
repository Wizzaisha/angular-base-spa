import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from '../../shared/store/app.reducer';
import { Module1Actions } from './store/actions.types';
import { selectNumberState, selectTheme } from './store/selectors';
import { PrimaryButtonComponent } from '../../shared/components/buttons/primary-button/primary-button.component';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-module1',
  imports: [
    PrimaryButtonComponent,
    TextInputComponent,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './module1.component.html',
  styleUrl: './module1.component.css',
})
export class Module1Component {
  numberState$!: Observable<number>;
  currentTheme$!: Observable<'light' | 'dark'>;
  currentTheme!: 'light' | 'dark';

  form!: FormGroup;

  get nameField(): FormControl {
    return this.form.get('name') as FormControl;
  }

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.selectStoreData();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectStoreData(): void {
    this.numberState$ = this.store.select(selectNumberState);
    this.currentTheme$ = this.store.select(selectTheme);
    this.currentTheme$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => (this.currentTheme = data));
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  handleNumberChange(type: number): void {
    if (type === 0) {
      this.store.dispatch(Module1Actions.incrementAction());
    } else {
      this.store.dispatch(Module1Actions.decrementAction());
    }
  }

  handleToggleTheme(): void {
    this.store.dispatch(
      Module1Actions.setTheme({
        theme: this.currentTheme === 'light' ? 'dark' : 'light',
      })
    );
  }

  handleSubmit(): void {
    this.form.markAllAsTouched();
    this.form.markAsDirty();

    if (this.form.valid) {
      const formValues: any = this.form.getRawValue();
      console.log(formValues);
    } else {
      console.log('Not valid');
    }
  }
}
