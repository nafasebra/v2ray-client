import Main from "@/page/main";
import Status from "@/page/status";
import Confirm from "@/page/confirm";
const routes = [
    { path: "/confirm", element: <Confirm/> },
    { path: "/status", element: <Status/> },
    { path: "/", element: <Main/> },
];


export default routes;