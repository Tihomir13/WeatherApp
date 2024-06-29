import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
export class SearchBarComponent implements OnInit, OnDestroy {
  @ViewChild('searchBar', { static: true }) searchBar!: ElementRef;

  @Output() select = new EventEmitter();
  searchedText = '';
  results: any[] = [];
  private searchSubject = new Subject<string>();
  clickListener: any;
  isVisible = false;
  searchBarWidth = '';
  private resizeListener!: () => void; // Променлива за слушателя за resize

  constructor(
    private service: RequestsService,
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

    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.logSearchBarWidth();
    });

    this.logSearchBarWidth();
  }

  onSearch() {
    if (this.searchedText.trim() === '') return;
    this.isVisible = true;
    this.searchSubject.next(this.searchedText);
    this.logSearchBarWidth();
  }

  onSubmit() {
    this.onCityClick(this.results[0]);
  }

  onCityClick(city: any) {
    this.searchedText = '';
    this.select.emit(city);
    this.results = []; // Затваряне на списъка след избор
  }

  onDocumentClick(event: MouseEvent) {
    if (this.searchBar.nativeElement.contains(event.target)) {
      if (this.searchedText != '') {
        this.logSearchBarWidth();
        this.isVisible = true;
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
          },
          error: (error) => {
            console.log('Error fetching cities:', error);
          },
        });
      });
  }

  logSearchBarWidth(): void {
    this.searchBarWidth = this.searchBar.nativeElement.offsetWidth;
  }

  ngOnDestroy() {
    // Премахване на слушателя за кликове към документа
    if (this.clickListener) {
      this.clickListener();
    }
    // Премахване на слушателя за resize събитие
    if (this.resizeListener) {
      this.resizeListener();
    }
    this.searchSubject.unsubscribe();
  }
}
