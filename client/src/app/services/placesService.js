import httpService from "./httpService";

const placesService = {
    placesEndPoint: "info/places/",

    get: async function() {
        const data = await httpService.get(this.placesEndPoint);
        return data;
    }
};

export default placesService;
