import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  constructor(public dialogRef :MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any) { }

  ngOnInit() {
  }

}
