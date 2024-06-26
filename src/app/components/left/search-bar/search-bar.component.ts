import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestsService } from '../../../requests.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnDestroy {
  @Output() select = new EventEmitter();
  searchedText = '';
  results: any[] = [];

  private searchSubject = new Subject<string>();

  constructor(private service: RequestsService) {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchText) => {
        this.service.getCities(searchText).subscribe({
          next: (response: any) => {
            this.results = response.geonames;
            console.log(this.results);
          },
          error: (error) => {
            console.log('Error fetching cities:', error);
          },
        });
      });
  }

  onSearch() {
    if (this.searchedText.trim() === '') return;
    this.searchSubject.next(this.searchedText);
  }

  ngOnDestroy() {
    this.searchSubject.unsubscribe();
  }

  onCityClick(city: any) {
    this.searchedText = '';
    console.log(city);
    this.select.emit(city)
  }
}
