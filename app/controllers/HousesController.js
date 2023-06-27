import { AppState } from "../AppState.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";


function _drawHouses() {
  let houses = AppState.houses
  console.log('here are the houses:🏠', houses);

  let template = ''
  houses.forEach(house => template += house.CardTemplate)
  setHTML('cribsList', template)
}

function _showFormButton() {
  const account = AppState.account
  if (!account) {
    return
  }
  const houseFormButton = document.getElementById('houseFormButton')
  houseFormButton.classList.remove('d-none')
}
export class HousesController {
  constructor() {
    console.log('the houses controller is up :)');
    this.getHouses()

    AppState.on('houses', _drawHouses)
    AppState.on('account', _drawHouses)
    AppState.on('account', _showFormButton)
  }

  //1. GET
  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async createHouse(event) {
    try {
      event.preventDefault()
      console.log('the form has been submitted!');
      const form = event.target
      const houseData = getFormData(form)
      console.log('house data', houseData);
      await housesService.createHouse(houseData)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async deleteHouse(houseId) {
    try {
      const wantsToDelete = await Pop.confirm('Are you sure you want to sell?')
      if (!wantsToDelete) {
        return
      }
      await housesService.deleteHouse(houseId)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }
}