import { AppState } from "../AppState.js"

export class House {

  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl || 'no image'
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creator = data.creator
  }

  get CardTemplate() {
    return `
    <div class="col-10 m-auto mb-3">
      <section class="row bg-light elevation-5 ">
        <div class="col-12 col-md-4 p-0">
        
              <img src="${this.imgUrl}" class="img-fluid" alt="house">
            </div>
            <div class="col-8 p-3">
              <h2>${this.bedrooms} Bedroom ${this.bathrooms} Bathroom, Built in ${this.year} </h2>
              <h3>$${this.price}</h3>
              <h4>${this.levels} Levels</h4>
              <p>${this.description}</p>
              <p class="fs-4">Date Created: ${this.createdAt.toLocaleString()}</p>
              <p class="fs-4">Last Updated: ${this.updatedAt.toLocaleString()}</p>
              <div class="d-flex align-items-center mb-3">
                <h5 class="me-3">${this.creator.name}</h5>
                <img class="img-fluid creator-picture" src="${this.creator.picture}" alt="${this.creator.name}">
              </div>
              ${this.ComputeDeleteButton}
              ${this.ComputeEditButton}

        </div>
      </section>
    </div>
    `
  }

  get ComputeDeleteButton() {
    if (!AppState.account || AppState.account.id != this.creatorId) {
      return ''
    }
    return `
    <button class="btn btn-danger text-light" onclick="app.HousesController.deleteHouse('${this.id}')">Mark as Sold!</button>
    `
  }

  get ComputeEditButton() {
    if (!AppState.account || AppState.account.id != this.creatorId) {
      return ''
    }
    return `
    <button class="btn btn-warning text-light" onclick="app.HousesController.editHouse('${this.id}')">Mark as Sold!</button>
    `
  }

  get EditForm() {
    return `
    <div class="card card-body">
                <form onsubmit="app.HousesController.createHouse(event)">

                  <div>
                    <label for="houseYear">Year Built:</label>
                    <input type="number" id="houseYear" min="" max="" name="year" required>
                  </div>

                  <div>
                    <label for="houseBedrooms">Bedrooms:</label>
                    <input type="number" id="houseBedrooms" min="1" name="bedrooms" required>
                  </div>

                  <div>
                    <label for="houseBathrooms">Bathrooms:</label>
                    <input type="number" id="houseBathrooms" min="1" name="bathrooms" required>
                  </div>

                  <div>
                    <label for="housePicture">House Image URL:</label>
                    <input type="url" id="housePicture" name="imgUrl">
                  </div>

                  <div>
                    <label for="housePrice">Asking Price:</label>
                    <input type="number" id="housePrice" min="1" max="300000000" name="price" required>
                  </div>

                  <div>
                    <label for="houseLevels">Levels:</label>
                    <input type="number" id="houseLevels" min="1" max="30000000" name="levels" required>
                  </div>

                  <div>
                    <label for="houseDescription">Description:</label>
                    <textarea id="houseDescription" rows="5" cols="w-40" name="description"></textarea>
                  </div>
                  <button class="btn btn-secondary" type="submit">Submit</button>
                </form>
              </div>
    `
  }
}


// let houseData = {
//   {
//   `
//     "_id": "645d60f381faf24223ae886b",
//     "bedrooms": 3,
//     "bathrooms": 2,
//     "levels": 2,
//     "imgUrl": "https://floorcentral.com/wp-content/uploads/2014/07/sick-house-syndrome.jpg",
//     "year": 2003,
//     "price": 230000,
//     "description": "Super sick house",
//     "creatorId": "63f7d6202d1cf882287f12e2",
//     "createdAt": "2023-05-11T21:41:07.979Z",
//     "updatedAt": "2023-05-11T21:41:07.979Z",
//     "__v": 0,
//     "creator": {
//         "_id": "63f7d6202d1cf882287f12e2",
//         "name": "Charles Francis Xavier",
//         "picture": "https://www.looper.com/img/gallery/professor-xs-entire-backstory-explained/intro-1587748942.jpg",
//         "id": "63f7d6202d1cf882287f12e2"
//     },
//     "id": "645d60f381faf24223ae886b"
//     `
// }
// }