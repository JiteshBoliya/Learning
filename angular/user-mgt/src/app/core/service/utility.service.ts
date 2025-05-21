import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
      providedIn: 'root'
})
export class UtilityService {
      private _snackBar = inject(MatSnackBar);

      openSnackBar(message: string, panelClass: string) {
            this._snackBar.open(message, 'Close', {
                  duration: 1000,
                  panelClass: [panelClass]
            });
      }
}