import { DataStorageService } from './shared/data-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private dataService: DataStorageService) {
  }

  ngOnInit() {
  }
}
