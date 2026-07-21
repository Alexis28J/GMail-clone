import { Component, Inject } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormField, MatLabel, MatInput, MatHint } from "@angular/material/input";
import { MatAnchor } from "@angular/material/button";
import { FormsModule } from '@angular/forms';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-rename-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatFormField, MatLabel, MatInput, MatDialogActions, MatAnchor, MatDialogClose, FormsModule, MatHint, MatIcon],
  templateUrl: './rename-dialog.html',
  styleUrls: ['./rename-dialog.scss'],
})

export class RenameDialog {

  folderName: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { name: string }
  ) {
    this.folderName = data.name;
  }

}




