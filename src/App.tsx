import {Route, Routes} from "react-router-dom";
import {AuthLayout, RootLayout} from "./layouts";
import {NotFound} from "./pages";
import {AuthChecker} from "./middlewares";
import {Clinics} from "@/pages";

function App() {
    return (
        <Routes>
            {/* Root layout */}
            <Route
                element={
                    <AuthChecker>
                        <RootLayout/>
                    </AuthChecker>
                }
            >
                <Route index element={<Clinics/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>

            {/* Auth layout */}
            <Route path="/auth" element={<AuthLayout/>}/>
        </Routes>
    );
}

export default App;
