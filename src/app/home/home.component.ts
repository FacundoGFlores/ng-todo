import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import  { ItemsService } from '../shared/items.service';
import { Item } from '../shared/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myForm: FormGroup;
  uri: string;
  saving: boolean;

  item = new Item();
  _items: Item[];

  constructor(private itemsService: ItemsService) {
    this.myForm = new FormGroup({
      id: new FormControl(
        '', [
          Validators.required,
          Validators.pattern('[0-9]+')
        ]
      ),
      title: new FormControl(),
      description: new FormControl()
    });
  }

  ngOnInit() {

  }

  save(value, isValid) {
    if (!isValid) {
      alert('Check values!');
    }
    this.saving = true;
    this.itemsService.sendItem(value)
      .subscribe((r) => {
        this.saving = false;
        this.uri = r.uri;
        this.itemsService.getItems(this.uri)
          .subscribe((i) => this._items = i);
      });
  }
}
