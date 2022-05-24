import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';


export const Dashboard = () => {
    return (
        <>

                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="intakes" element={<IntakesPage />} >
                        <Route  path="prereports" element={<PreReports />} />
                        <Route path="all-intakes" element={<Intakes />} />
                        <Route path="repack" element={<Repack />} />
                    </Route> */}
                   
                    <Route path="*" element={<Navigate replace to="/404" />} />
                </Routes>
        </>
    )
}
