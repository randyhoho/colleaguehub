import { Component, OnInit } from '@angular/core';
import { Colleague } from './colleague';
import { ColleagueService } from './colleague.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  public colleagues!: Colleague[];
  public editColleague!: Colleague;
  public deleteColleague!: Colleague;

  constructor(private colleagueService: ColleagueService){}

  ngOnInit() {
    this.getColleagues();
  }

  public getColleagues(): void {
    this.colleagueService.getColleagues().subscribe(
      (response: Colleague[]) => {
        this.colleagues = response;
        console.log(this.colleagues);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-colleague-form')!.click();
    this.colleagueService.addColleague(addForm.value).subscribe(
      (response: Colleague) => {
        console.log(response);
        this.getColleagues();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(colleague: Colleague): void {
    this.colleagueService.updateColleague(colleague).subscribe(
      (response: Colleague) => {
        console.log(response);
        this.getColleagues();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(colleagueId: number): void {
    this.colleagueService.deleteColleague(colleagueId).subscribe(
      (response: void) => {
        console.log(response);
        this.getColleagues();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchColleagues(key: string): void {
    console.log(key);
    const results: Colleague[] = [];
    for (const colleague of this.colleagues) {
      
      //! -1 = 我地搵到佢
      if (colleague.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || colleague.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || colleague.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || colleague.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(colleague);
      }
    }
    this.colleagues = results;
    if (results.length === 0 || !key) {
      this.getColleagues();
    }
  }

  public onOpenModal(colleague: Colleague| null | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addColleagueModal');
    }
    if (mode === 'edit') {
      this.editColleague = colleague!;
      button.setAttribute('data-target', '#updateColleagueModal');
    }
    if (mode === 'delete') {
      this.deleteColleague = colleague!;
      button.setAttribute('data-target', '#deleteColleagueModal');
    }
    container!.appendChild(button);
    button.click();
  }
}
