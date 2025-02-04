import { Outlet, Link } from "react-router-dom";
import LessonRoutes from "./Lesons/LessonRoutes";
import SonineJuosta from "../components/SonineJuosta";

function LessonPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 space-y-8 animate-fade-in">
                <SonineJuosta />
            </div>
            <div className="lg:col-span-9 space-y-8 animate-fade-in">
               Cia matysi pasirinkta pamoka is Kairiojo meniu.
               <LessonRoutes />
            </div>
        </div>
    );
}

export default LessonPage;