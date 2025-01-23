import React, { useState } from 'react'
import Title from './Title'

const PopularProducts = () => {

    const [popularProducts, setpopularProducts] = useState(second)
    
  return (
    <section>
        <Title title={'Popular Products'} titleStyles={'text-center'}/>
        {/* Container */}
        <div>
            {pop}
        </div>
    </section>
  )
}

export default PopularProducts