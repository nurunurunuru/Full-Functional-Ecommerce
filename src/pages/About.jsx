import React from 'react'
import aboutImg from '../assets/about.png';
import { RiDoubleQuotesL } from 'react-icons/ri';
import Footer from '../components/Footer';

const About = () => {

  const statistics = [
  {label: "Satisfied Customers",value: 99},
  {label: "Exclusive Products",value: 12},
  {label: "New Products",value: 5},
  ]
  return (
    <section>
      <div className='max-padd-container'>
        <div className='max-padd-container py-10 bg-white rounded-2xl my-6'>
          {/* Container */}
          <div className='flex flex-col xl:flex-row gap-10'>
            {/* Left-Side */}
            <div className='flex-1 relative'>
            <div className='bg-secondary rounded-3xl rounded-tr-[155px] w-[488px]'>
             <img src={aboutImg} alt="" />
            </div>
            
            <div className='bg-white absolute bottom-0 left-16 max-w-xs p-4 rounded-2xl flexCenter flex-col shadow-sm'>
              <span className='relative bottom-8 p-3 text-white h-12 w-12 flex items-center rounded-full bg-secondary'><RiDoubleQuotesL classname='text-2xl'/></span>
              <p className='text-center relative bottom-3'>Discover Your Fashion that speaks to your style. Elavate Your wardrobe with exclusive Collection!
              </p>
            </div>
            </div>
            {/* Right-Side */}
            <div className='flex-1 flex justify-center flex-col'>
              <span className='medium-18 text-secondary'>Unveiling Our Journey</span>
              <h2 className='h2 max-w-[472px]'>Our Commitement is Crafting Individualized Fashion Experiences</h2>
              <p className='py-5'>Discover the essence of style, where each peice is crafted with care and precision.We bring fasions that speaks to individuality and quality. From the latest trend to timeless classics, we are dedicated to elivating your wardrobe with exceptional designs.</p>
              {/* Statistic-Container */}
              <div className='flex flex-wrap gap-4'>
              {statistics.map((statistics,index)=>(
                <div key={index} className='bg-primary text-secondary p-4 rounded-lg'>
                 <div className='flex items-center gap-1'>
                  <h3 className='h3'>{statistics.value}</h3>
                  <h4 className='bold-22'>+</h4>
                 </div>
                 <p>{statistics.label}</p>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  )
}

export default About