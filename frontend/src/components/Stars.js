import React, { useState, useEffect } from 'react';

const Stars = () => {
    const [moon, setMoon] = useState(null)

    
    const fetchStars = async () => {
        const response = await fetch(`/moon`)
        const data = response.json()
    }
    return(
        <div></div>
    )
}