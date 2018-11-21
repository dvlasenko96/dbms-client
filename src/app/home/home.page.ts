import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
  ) {
    this._buildForm();
  }

  public addEvent() {
    const formData = this.form.value;

    const url = `${environment.API_URL}/events`;
    const data = {
      title: formData.title,
      duration: [formData.dateFrom, formData.dateTo],
      price: formData.price,
    };
    this._http.post(url, data)
      .pipe(take(1))
      .subscribe(res => {
        console.log(res);
      });
  }

  private _buildForm() {
    this.form = this._fb.group({
      title: [null, Validators.required],
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required],
      price: [null, Validators.required],
    });
  }
}
