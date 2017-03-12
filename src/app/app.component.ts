import { Component } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Article } from './article';

import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pagetitle = 'Hacker News';

  apiurl: string = 'http://starlord.hackerearth.com/edfora/hackernews';

  data: Article[] = new Array<Article>();
  articles: Article[] = new Array<Article>();
  articlesCopy: Article[] = new Array<Article>();

  query: string = '';
  searchBy: string = 'title';

  title: string[] = [];
  author: string[] = new Array<string>();
  autoComplete: string[] = [];

  constructor(private http: Http, private slimLoadingBarService: SlimLoadingBarService) {
      // to get lookup list and count on load
      this.startLoading();
        this.http.get(this.apiurl)
            .subscribe((res: Response) => {
              this.data = res.json(),this.processData();
            });
      }
      startLoading() {
        this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    }

    stopLoading() {
        this.slimLoadingBarService.stop();
    }
    completeLoading() {
        this.slimLoadingBarService.complete();
    }
    processData() {
        for (let d of this.data)
        {
          if (d.id != null) {
            d.date = new Date(d.created_at);
            this.articles.push(d);
            this.title.push(d.title);
            this.author.push(d.author);
          }
        }
        this.articlesCopy = this.articles;
        this.autoComplete = this.title;
        const uniqueAuthor = this.author.filter(function(elem, index, self) {
                        return index === self.indexOf(elem);
                    });
        this.author = uniqueAuthor;
        this.completeLoading();
        this.stopLoading();
      }
      search() {
      this.articles = this.articlesCopy;
      const prop = this.searchBy;
      const searchText = this.query.toLowerCase();
      if ( searchText.length === 0) {
        this.articles = this.articlesCopy;
      } else {
       this.articles = this.articles.filter(function(a)
       {
         return a[prop].toString().toLowerCase().indexOf(searchText) > -1;
       }
   ); }
    }
    reset() {
       this.articles = this.articlesCopy;
       this.query = '';
    }
    sortAsc(prop: string) {
      this.articles.sort(function(a, b) {
        if (typeof a[prop] === 'string') {
       if (a[prop].toLowerCase() > b[prop].toLowerCase()) { return 1; } else
       if (a[prop].toLowerCase() < b[prop].toLowerCase()) { return -1; } else { return 0; }
          } else
     if (a[prop] > b[prop]) { return 1; } else if (a[prop] < b[prop]) { return -1; } else { return 0; }
});
    }
    sortDsc(prop: string){
 this.articles.sort(function(a, b) {
    if (typeof a[prop] === 'string'){
       if (a[prop].toLowerCase() < b[prop].toLowerCase()) { return 1; } else
       if (a[prop].toLowerCase() > b[prop].toLowerCase()) { return -1; } else { return 0; }
          } else
     if (a[prop] < b[prop]) { return 1; } else if (a[prop] > b[prop]) { return -1; } else { return 0; }
});
    }
    setSearchBY(value: string) {
      this.searchBy = value;
      if (value === 'title') {
        this.autoComplete = this.title;
      } else {
        this.autoComplete = this.author;
      }
    }
}
