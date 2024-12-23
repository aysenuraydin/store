import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // contacts = [
  //   {
  //     name: { first: 'John', last: 'Doe' },
  //     email: 'john.doe@example.com',
  //     gender: 'male',
  //     location: { city: 'New York' },
  //     phone: '123-456-7890',
  //     registered: { date: '2022-01-01T00:00:00Z' },
  //     picture: { thumbnail: 'https://randomuser.me/api/portraits/thumb/men/1.jpg' },
  //     selected: false,
  //   },
  //   {
  //     name: { first: 'Jane', last: 'Doe' },
  //     email: 'jane.doe@example.com',
  //     gender: 'female',
  //     location: { city: 'Los Angeles' },
  //     phone: '987-654-3210',
  //     registered: { date: '2023-02-15T00:00:00Z' },
  //     picture: { thumbnail: 'https://randomuser.me/api/portraits/thumb/women/1.jpg' },
  //     selected: false,
  //   },
  //   {
  //     name: { first: 'Jane', last: 'Doe' },
  //     email: 'jane.doe@example.com',
  //     gender: 'female',
  //     location: { city: 'Los Angeles' },
  //     phone: '987-654-3210',
  //     registered: { date: '2023-02-15T00:00:00Z' },
  //     picture: { thumbnail: 'https://randomuser.me/api/portraits/thumb/women/2.jpg' },
  //     selected: false,
  //   },
  //   {
  //     name: { first: 'Jane', last: 'Doe' },
  //     email: 'jane.doe@example.com',
  //     gender: 'female',
  //     location: { city: 'Los Angeles' },
  //     phone: '987-654-3210',
  //     registered: { date: '2023-02-15T00:00:00Z' },
  //     picture: { thumbnail: 'https://randomuser.me/api/portraits/thumb/men/2.jpg' },
  //     selected: false,
  //   }
  // ];

  // toggleSelect() {
  //   this.contacts = this.contacts.map(contact => {
  //     contact.selected = !contact.selected;
  //     return contact;
  //   });
  // }
}
