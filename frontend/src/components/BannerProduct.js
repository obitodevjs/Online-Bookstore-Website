import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/banner-01.jpg'
import image2 from '../assest/banner/banner-02.png'
import image3 from '../assest/banner/banner-03.png'
import image4 from '../assest/banner/banner-04.jpg'
import image5 from '../assest/banner/banner1.webp'


import image1Mobile from '../assest/banner/banner1.webp'
import image2Mobile from '../assest/banner/banner2_mobile.webp'
import image3Mobile from '../assest/banner/banner3_mobile.webp'
import image4Mobile from '../assest/banner/banner4_mobile.webp'
import image5Mobile from '../assest/banner/banner5_mobile.webp'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(preve => preve - 1)
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                setCurrentImage(prev => prev + 1)
            } else {
                setCurrentImage(0)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [currentImage, desktopImages.length])

    return (
        <div className='container mx-auto px-4 rounded '>
            <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>

                {/**desktop and tablet version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {
                        desktopImages.map((imageURl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-transform duration-700 ease-in-out' key={imageURl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURl} alt="" className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>


                {/**mobile version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileImages.map((imageURl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-transform duration-700 ease-in-out' key={imageURl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURl} alt="" className='w-full h-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}

export default BannerProduct