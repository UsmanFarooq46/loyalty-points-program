import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: MatSnackBar) {}

  openSnackBar(message: string) {
    this.toastr.open(message, 'X', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
