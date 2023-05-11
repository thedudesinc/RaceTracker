import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { EventOutput } from 'src/app/services/models/event.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  events$: Observable<EventOutput[]> = this.eventService.getAll();

  constructor(private eventService: EventService,) {
  }
}
