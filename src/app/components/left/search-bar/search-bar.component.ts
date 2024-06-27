import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestsService } from '../../../requests.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Output() select = new EventEmitter();
  searchedText = '';
  results: any[] = [];
  private searchSubject = new Subject<string>();
  clickListener: any;
  isVisible = false;

  constructor(
    private service: RequestsService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.loadList();
  }

  ngOnInit() {
    // Добавяне на слушател за кликове към документа
    this.clickListener = this.renderer.listen(
      'document',
      'click',
      (event: MouseEvent) => {
        this.onDocumentClick(event);
      }
    );
  }

  onSearch() {
    if (this.searchedText.trim() === '') return;
    this.isVisible = true;
    this.searchSubject.next(this.searchedText);
  }

  onButtonClick() {
    this.onCityClick(this.results[0]);
  }

  onCityClick(city: any) {
    this.searchedText = '';
    console.log(city);
    this.select.emit(city);
    this.results = []; // Затваряне на списъка след избор
  }

  onDocumentClick(event: MouseEvent) {
    if (this.elementRef.nativeElement.contains(event.target)) {
      if (this.searchedText != '') {
        this.isVisible = true;
        this.searchSubject.next(this.searchedText);
        this.loadList();
        return;
      }
    }
    this.isVisible = false;
  }

  loadList() {
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

  ngOnDestroy() {
    // Премахване на слушателя за кликове към документа
    if (this.clickListener) {
      this.clickListener();
    }
    this.searchSubject.unsubscribe();
  }
}
