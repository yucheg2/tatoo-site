import tatoos, { styles } from "../API/fake.api/tatoos";

class TattoosService {
    fetchTatoos() {
        return new Promise((resolve) => {
            window.setTimeout(() => {
                resolve({ tatoos, styles });
                localStorage.setItem("tatoosData", JSON.stringify({ tatoos, styles }));
            }, 1500);
        });
    }
}

export default new TattoosService();
