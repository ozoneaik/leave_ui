import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "./View/Dashboard.jsx";
import EditUser from "./View/EditUser.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<App/>}/>
            <Route path={'/dashboard'} element={<Dashboard/>}/>
            <Route path={'/edit/:id'} element={<EditUser/>}/>
        </Routes>
    </BrowserRouter>
)
