import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';


@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.css']
})
export class MyGroupsComponent implements OnInit {

  groupList: any[];
  accountList: any[];

  constructor(private service: GlobalService) { }

  ngOnInit(): void {
    this.service.checkLogStatus();

    this.service.httpGetProfile();

    this.service.onHttpGetProfile.subscribe((profile: any) => {
      this.groupList = profile.tag.groups;
      this.accountList = profile.tag.accounts;

    });
  }

}
