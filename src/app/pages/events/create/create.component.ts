import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControlsOf } from 'src/app/helpers/helper.types';
import { EventService } from 'src/app/services/event.service';
import { LoadingService } from 'src/app/services/loading.service';
import { EventInput } from 'src/app/services/models/event.model';
import { EventType } from 'src/app/services/types/event.types';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

declare var Datepicker: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  eventForm: FormGroup<ControlsOf<EventInput>> = new FormGroup<ControlsOf<EventInput>>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)] }),
    date: new FormControl(new Date().toLocaleDateString() as unknown as Date, { nonNullable: true }),
    type: new FormControl(EventType.Default, { nonNullable: true, validators: [Validators.required,] }),
  });

  get name() { return this.eventForm.controls.name; }
  get date() { return this.eventForm.controls.date; }
  get type() { return this.eventForm.controls.type; }

  calendarIcon = faCalendar;

  constructor(private eventService: EventService, private loadingService: LoadingService, private router: Router) { }

  ngOnInit(): void {
    const datepickerEl = document.getElementById('datepickerCreateEvent');
    new Datepicker(datepickerEl, {
      autohide: true
    });

    if (datepickerEl) {
      datepickerEl.addEventListener("changeDate", (event) => {
        this.eventForm.controls.date.patchValue((event.target as HTMLInputElement).value as unknown as Date);
      });
    }
  }

  onSubmit(): void {
    this.loadingService.isLoadingVisible.next(true);
    this.eventService.create({ ...this.eventForm.getRawValue(), date: new Date(this.date.value) }).subscribe((response) => {
      this.loadingService.isLoadingVisible.next(false);
      this.router.navigate(['/events/list']);
    });
  }
}
