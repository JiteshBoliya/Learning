import { Component } from '@angular/core';
import { LoaderService } from '../../core/service/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  loading = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.loaderState.subscribe(state => {
      this.loading = state;
    });
  }
}
