import Radar from "../pages/Radar";
import Question from "../pages/Question";
import VueRouter from "vue-router";

const routes = [
    {path: "*", redirect: {name: "radar"}},
    { name: "radar",path: '/radar', component: Radar },
    { name: "question", path: '/question', component: Question }
];

const router = new VueRouter({
    routes
});

export {
    router,
}