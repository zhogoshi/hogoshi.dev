import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Invalid } from "@routes/invalid"
import { Home } from "@routes/home"

export const AppRoutes = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="*" element={<Invalid />}></Route>
            </Routes>
        </BrowserRouter>
    </>
}