import { ActionEventParam } from "./action-event-param.model";

export class ActionEvent {
        public  id: number;
      
        public actionName: string;
        public actionDesc: string;
        public actionEventParams:ActionEventParam[];
  }