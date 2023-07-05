import StylesLayout from "./layouts/stylesLayout";
import MainPage from "./pages/mainPage/mainPage";
import MastersPage from "./pages/mastersPage/mastersPage";
import StoragePage from "./pages/storagePage/storagePage";

const routes = [
    { name: "Главная", path: "/", component: MainPage },
    { name: "Татуировки", path: "/styles", component: StylesLayout },
    { display: false, path: "/styles/:style", component: StylesLayout },
    { name: "Заказы", protected: true, counter: true, path: "/storage", component: StoragePage },
    { name: "Мастера", path: "/masters", component: MastersPage }
];

export default routes;
