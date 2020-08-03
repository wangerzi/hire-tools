import Radar from "../pages/Radar";
import Question from "../pages/Question";
import VueRouter from "vue-router";
import Main from "../pages/Main";

const routes = [
    {path: "*", redirect: {name: "radar"}},
    {path: "/tools/", component: Main, children: [
        { name: "radar",path: '/radar', component: Radar },
        { name: "question", path: '/question', component: Question }
    ]},
];

const menus = [
    {
        "name": "radar",
        "label": "Radar Map",
        "icon": "ios-clipboard-outline"
    },
    {
        "name": "question",
        "label": "Pre-Check Questions",
        "icon": "ios-checkmark-circle-outline"
    }
];

const router = new VueRouter({
    routes
});

export {
    router,
    menus
}