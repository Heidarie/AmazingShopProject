import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-number',
  templateUrl: './change-number.component.html',
  styleUrls: ['./change-number.component.css']
})
export class ChangeNumberComponent implements OnInit {
  number=''
  constructor() { }

  ngOnInit(): void {
  }

}
