import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NewsService } from './service/news.service';
import { Article } from './models/article.model';
import { Source } from './models/source.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'NewsApp';
  public sources: Source[] = []
  public articles: Article[] = []
  public selectedNewsChannel: string = "Top 10 Trending News"
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef, private newsApi: NewsService) {
  }

  ngOnInit(): void {

    this.newsApi.initArticles().subscribe((res: any) => {
      console.log(res.articles)
      return this.articles = res.articles
    })
    this.newsApi.initSources().subscribe((res: any) => {
      console.log(res.sources);
      return this.sources = res.sources
    })
  }

  ngAfterViewInit(): void {

    this.sideNav.opened = true;
    this.observer.observe(['(max-width:800px)'])
      .subscribe((res) => {
        if (res?.matches) {
          this.sideNav.mode = "over";
          this.sideNav.close();
          console.log(this.sideNav.opened)
        } else {
          this.sideNav.mode = 'side';
          this.sideNav.open();
          console.log(this.sideNav.opened)
        }
      })
    this.cdr.detectChanges();
  }

  sidenavIsOpen() {
    return this.sideNav?.opened
  }

  onSearchSource(source: Source) {
    this.newsApi.getArticlesById(source.id)
      .subscribe((res: any) => { this.articles = res.articles; this.selectedNewsChannel = source.name })
  }


}
