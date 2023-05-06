import { EventType } from "../types/event.types";

export interface EventInput {
  name: string;
  date: Date;
  type: EventType;
}

export interface EventOutput {
  id: string;
  name: string;
  date: Date;
  type: EventType;
  dateCreated: Date;
  dateModified: Date;
  dateDeleted: Date | null;
}
