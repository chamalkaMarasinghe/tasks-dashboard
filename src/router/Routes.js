import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../scenes/dashboard/Dashboard'

const Router = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default Router;