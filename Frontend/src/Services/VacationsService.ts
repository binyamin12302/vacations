import axios from "axios";
import VacationModel from "../Models/VacationModel";
import store from "../Redux/Store";
import { addVacationAction, deleteVacationAction, fetchVacationsAction, updateVacationAction } from "../Redux/VacationsState";
import config from "../Utils/Config";


class VacationsService {


  // Get all vacations: 
  public async getAllVacations(): Promise<VacationModel[]> {
    let vacations = store.getState().vacationsState.vacations;

    if (vacations.length === 0) {
      const response = await axios.get<VacationModel[]>(config.vacationUrl);
      vacations = response.data;

      if(vacations.length !== 0 ){
        store.dispatch(fetchVacationsAction(vacations)); 
      }
     
    }

    return vacations;
  }


  // Add  new vacation: 
  public async addVacation(vacation: VacationModel): Promise<VacationModel> {

    const formData = new FormData();
    formData.append("description", vacation.description);
    formData.append("destination", vacation.destination);
    formData.append("startDate", vacation.startDate);
    formData.append("endDate", vacation.endDate);
    formData.append("price", vacation.price.toString());
    formData.append("image", vacation.image?.item(0));

    console.log("FormData:", vacation.description);

    const response = await axios.post<VacationModel>(config.vacationUrl, formData);
    
    const addedVacation = response.data;


    store.dispatch(addVacationAction(addedVacation));

    return addedVacation;
  }


  public async updateVacation(vacation: VacationModel): Promise<VacationModel> {

    const formData = new FormData();
    formData.append("description", vacation.description);
    formData.append("destination", vacation.destination);
    formData.append("startDate", vacation.startDate);
    formData.append("endDate", vacation.endDate);
    formData.append("price", vacation.price.toString()); 
    formData.append("image", vacation.image.item(0));


    const response = await axios.patch<VacationModel>(config.vacationUrl + vacation.id, formData);
    const updatedVacation = response.data;

    store.dispatch(updateVacationAction(updatedVacation))

    return updatedVacation;
  }


  public async deleteVacation(vacationId: number): Promise<void> {
    await axios.delete<string>(config.vacationUrl + vacationId);
    store.dispatch(deleteVacationAction(vacationId));
  }

}




const vacationsService = new VacationsService();

export default vacationsService;