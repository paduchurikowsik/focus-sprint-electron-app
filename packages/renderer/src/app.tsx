import React, { useState } from 'react'
import './app.css'
import CompleteTimer from './components/completeTimer'

const App: React.FC = () => {
    return (
        <div className='app'>
            <header className='app-header'>
                <CompleteTimer />
            </header>
        </div>
    )
}

export default App
