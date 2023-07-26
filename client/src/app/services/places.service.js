import httpService from "./http.service";

class PlacesService {
    #placesEndPoint = "info/places/";

    async get() {
        const { data } = await httpService.get(this.#placesEndPoint);
        return data;
    }
};

export default new PlacesService();
