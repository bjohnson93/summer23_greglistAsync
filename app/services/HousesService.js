import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "./AxiosService.js"


class HousesService {
  async getHouses() {
    const res = await api.get('api/houses')
    console.log('svc has houses', res.data);
    //2. Data looked good in above log, so mapped and added to app state!
    const builtHouses = res.data.map(housePojo => new House(housePojo))

    AppState.houses = builtHouses
  }
  async createHouse(houseData) {
    const res = await api.post('api/houses', houseData)
    const builtHouse = new House(res.data)
    AppState.houses.push(builtHouse)
    AppState.emit('houses')
  }
  async deleteHouse(houseId) {
    console.log('car id', houseId);
    const res = await api.delete(`api/houses/${houseId}`)
    const houseIndex = AppState.houses.findIndex(houseIndex, 1)
    if (houseIndex == -1) {
      throw new Error(`no car index found with the id of ${carId}`)
    }
    AppState.houses.splice(houseIndex, 1)
    AppState.emit('houses')
  }

}

export const housesService = new HousesService()