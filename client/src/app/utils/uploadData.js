import { styles } from "../API/fake.api/styles";
import { tatoos } from "../API/fake.api/tatoos";
import { sizes } from "../API/fake.api/sizes";
import { places } from "../API/fake.api/places";
// import { masters } from "../API/fake.api/masters";
import { useState } from "react";
import httpService from "../services/httpService";

const useUploadData = () => {
    const getTatoosId = (src) => {
        const withoutSlash = src.split("/")[2];
        return withoutSlash.slice(0, -4);
    };
    const [error, setError] = useState();
    async function initialize() {
        try {
            for (const key in styles) {
                await httpService.put(`styles/${key}`, styles[key]);
            }
            for (const key in sizes) {
                await httpService.put(`sizes/${key}`, sizes[key]);
            }
            await httpService.put(`places/`, places);
            for (const el of tatoos) {
                getTatoosId(el.src);
                await httpService.put(`tatoos/${getTatoosId(el.src)}`, el);
            }
        } catch (error) {
            setError(error);
        }
    }
    return ({ error, initialize });
};

export default (useUploadData);
