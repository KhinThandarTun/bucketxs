import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { GroceryState } from '../../../store/states/grocery.state';
import { Observable } from 'rxjs';
import { Grocery } from '../../../models/grocery.model';
import { CommonModule } from '@angular/common';
import { AddToBucket, RemoveFromBucket } from '../../../store/actions/bucket.actions';

@Component({
  selector: 'app-grocery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.scss'
})
export class GroceryComponent {
  groceries$: Observable<Grocery[]> = inject(Store).select(GroceryState.getAllGroceries);

  //groceries$: Signal<Grocery[]> = inject(Store).selectSignal(GroceryState.getAllGroceries);
  filterGroceries$?: Observable<Grocery[]>;
  constructor(private store: Store){
  }

  onTypeChange(e: Event){
    const selectedType = (e.target as HTMLSelectElement).value;
    if(selectedType) this.filterGroceries$ = this.store.select(GroceryState.getGroceriesByType(selectedType));
    else this.filterGroceries$ = undefined
  }

  increment(groc: Grocery){
    const payload = {
      id: groc.id,
      name: groc.name,
      quantity: 1
    }

    this.store.dispatch(new AddToBucket(payload));

  }

  decrement(groc: Grocery){
    const payload = {
      id: groc.id,
    }

    this.store.dispatch(new RemoveFromBucket(payload));
  }
}
