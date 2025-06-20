import VacationModel from "../Models/VacationModel";

export class VacationsState {
  public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
  FetchVacations = "FetchVacations",
  AddVacation = "AddVacation",
  UpdateVacation = "UpdateVacation",
  DeleteVacation = "DeleteVacation",
}

export interface VacationsAction {
  type: VacationsActionType;
  payload: any; 
}

export function fetchVacationsAction(vacations: VacationModel[]): VacationsAction {
  const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: vacations };
  return action;
}

export function addVacationAction(vacation: VacationModel): VacationsAction {
  const action: VacationsAction = { type: VacationsActionType.AddVacation, payload: vacation };
  return action;
}

export function deleteVacationAction(vacationId: number): VacationsAction {
  const action: VacationsAction = { type: VacationsActionType.DeleteVacation, payload: vacationId };
  return action;
}

export function updateVacationAction(vacation: VacationModel): VacationsAction {
  const action: VacationsAction = { type: VacationsActionType.UpdateVacation, payload: vacation };
  return action;
}


export function vacationsReducer(currentState: VacationsState = new VacationsState(), action: VacationsAction): VacationsState {
  const newState = { ...currentState };

  switch (action.type) {

    case VacationsActionType.FetchVacations:
      newState.vacations = action.payload;
      break;

    case VacationsActionType.AddVacation:

      const dupAddVacation = {
        ...action.payload, followState: "Follow",
        followers: 0
      }

      const isVacationExist = newState.vacations.find(v => v.id === action.payload.id)

      if (isVacationExist === undefined) {
        newState.vacations.unshift(dupAddVacation);
      }

      break;

    case VacationsActionType.DeleteVacation:
      const indexToDelete = newState.vacations.findIndex(v => v.id === action.payload);
      if (indexToDelete >= 0) {
        newState.vacations.splice(indexToDelete, 1);
      }
      break;

    case VacationsActionType.UpdateVacation:
      const indexToUpdate = newState.vacations.findIndex(v => v.id === action.payload.id);

      const dupUpdateVacation = {
        ...action.payload, followState: newState.vacations[indexToUpdate].followState,
        followers: newState.vacations[indexToUpdate].followers
      }

      if (indexToUpdate >= 0) {
        newState.vacations[indexToUpdate] = dupUpdateVacation;
      }

      break;

  }

  return newState;
}

