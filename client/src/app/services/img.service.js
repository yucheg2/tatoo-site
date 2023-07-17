import httpService from "./http.service";

class ImgService {
    #endPoint = "img/";

    async upload(file) {
        const { data } = await httpService.post(
            this.#endPoint + "upload",
            file,
            { headers: { "content-type": "multipart/form-data" } }
        );

        return data;
    }
}

export default new ImgService();
