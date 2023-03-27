import StylesLayout from "./layouts/stylesLayout";
import MainPage from "./pages/mainPage/mainPage";
import StoragePage from "./pages/storagePage/storagePage";

const routes = [
    { name: "Главная", path: "/", component: MainPage },
    { name: "Татуировки", path: "/styles", component: StylesLayout },
    { display: false, path: "/styles/:style", component: StylesLayout },
    { name: "Заказы", path: "/storage", component: StoragePage }
];

export default routes;
