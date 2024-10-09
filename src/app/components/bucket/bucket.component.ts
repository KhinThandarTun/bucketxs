import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { BucketState } from '../../../store/bucket.state';
import { Observable } from 'rxjs';
import { Bucket } from '../../../models/bucket.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bucket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bucket.component.html',
  styleUrl: './bucket.component.scss'
})
export class BucketComponent {
  myBucket$: Observable<Bucket[]> = inject(Store).select(BucketState.getMyBucket);
  constructor(private store: Store){}
}
