import React from 'react'

const PlaceOrder = () => {
  return (
    <section>
      <div>
        <form>
          {/* Delivery information */}
          <h3>Delivery Information</h3>
          <div>
            <input 
            type="text"
            name='firstName'
            placeholder='First Name'
            required
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2'
            />
            <input 
            type="text"
            name='lastName'
            placeholder='Last Name'
            required
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2'
            />
            </div>
            <input 
            type="email"
            name='email'
            placeholder='Email'
            required
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2'
            />
            <input 
            type="text"
            name='phone'
            placeholder='Phone Number'
            required
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2'
            />
            <input 
            type="text"
            name='street'
            placeholder='Street'
            required
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2'
            />
          <div>
            <input 
            type="text"
            name='city'
            placeholder='City'
            required
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2'
            />
            <input 
            type="text"
            name='state'
            placeholder='State'
            required
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2'
            />
            </div>
          <div>
            <input 
            type="text"
            name='city'
            placeholder='City'
            required
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2'
            />
            <input 
            type="text"
            name='state'
            placeholder='State'
            required
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2'
            />
            </div>
        </form>
      </div>
    </section>
  )
}

export default PlaceOrder