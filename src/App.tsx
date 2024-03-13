import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'App.css'

import Header from 'components/fixed/header/Header'
import Info from 'pages/Info'
import Scheduling from 'pages/Scheduling'
import Expenses from 'pages/Expenses'
import Services from 'pages/Services'

import DocsProvider from 'DocsContext'

const App = () => {

    const [currentPage, setCurrentPage] = useState(0)

    return (
        <div>
            <DocsProvider>
                <Router>
                    <Header currentPage={currentPage} />
                    <Routes>
                        <Route
                            path='/'
                            element={<Info setCurrentPage={setCurrentPage} />}
                        />
                        <Route
                            path='/schedulings'
                            element={<Scheduling setCurrentPage={setCurrentPage} />}
                        />
                        <Route
                            path='/expenses'
                            element={<Expenses setCurrentPage={setCurrentPage} />}
                        />
                        <Route
                            path='/services'
                            element={<Services setCurrentPage={setCurrentPage} />}
                        />
                    </Routes>
                </Router>
            </DocsProvider>
        </div>
    )

}

export default App