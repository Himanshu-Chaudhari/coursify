
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [display, setDisplay] = useState(1);
  const handlePrev = () => {
    setDisplay(prevDisplay => (prevDisplay === 1 ? 3 : prevDisplay - 1));
  };

  const handleNext = () => {
    setDisplay(prevDisplay => (prevDisplay === 3 ? 1 : prevDisplay + 1));
  };

  return (
    <div>
      <div className='h-screen bg-body-bg'>
        <div className='text-white text-5xl font-extrabold shadow-lg p-5'>
          Coursify
        </div>
        <div className='flex h-screen text-white overflow-hidden'>
          <div className='flex '>
            <div className=' w-20 text-center my-auto text-3xl'>
              <button
                onClick={handlePrev}
                className={`${display == 1 ? 'hidden' : ''}  font-extrabold `}
              >
                &lt;
              </button>
            </div>
            <div className='w-10/12 relative overflow-hidden'>
              <div
                className='flex h-full transition-transform duration-500 ease-out'
                style={{ transform: `translateX(-${(display - 1) * 100}%)` }}
              >
                <div className='flex-shrink-0 w-full h-full flex items-center justify-center'>
                  <div className='bg-cover bg-comp h-2/6 w-2/6'></div>
                  <div className='mx-14  w-3/6'>
                    <div className='font-bold text-5xl'>
                      Have an optimized learning environment
                    </div>
                    <br />
                    <div className='font-bold text-2xl text-yellow-400'>
                      Your School.  Your programs.  Your Students.
                    </div>
                    <br />
                    <div className='text-xl'>
                      Manage your courses and to offer its students an optimized learning environment, with progress control and support each lesson via comments to ask questions.
                    </div>
                    <Button />
                  </div>
                </div>
                <div className='flex-shrink-0 w-full h-full flex items-center justify-center'>
                  <div className='bg-cover bg-comp h-2/6 w-2/6'></div>
                  <div className='mx-14 w-3/6'>
                    <div className='font-bold text-5xl'>
                      Customize the look of your courses
                    </div>
                    <br />
                    <div className='font-bold text-2xl text-yellow-400'>
                      Your name. Your logo. Your image.
                    </div>
                    <br />
                    <div className='text-xl'>
                      You can customize the look of your courses quickly by choosing a color scheme, putting your logo your cover image and links to their social networks.
                    </div>
                    <Button />
                  </div>
                </div>
                <div className='flex-shrink-0 w-full h-full flex items-center justify-center'>
                  <div className='bg-cover bg-comp h-2/6 w-2/6'></div>
                  <div className='mx-14 w-3/6'>
                    <div className='font-bold text-5xl'>
                      Create your online courses in a few steps!
                    </div>
                    <br />
                    <div className='font-bold text-2xl text-yellow-400'>
                      Your courses. Your content. Your audience.
                    </div>
                    <br />
                    <div className='text-xl'>
                      Create online courses quickly and easily!
                      Coursify.me is Free and you can test the platform quickly with your real content!
                    </div>
                    <Button />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleNext}
              className={`${display == 3 ? 'hidden' : ''} w-20 text-center my-auto text-3xl font-extrabold`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#202B3B' }} className='text-center text-white'>


        <footer className="bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Coursify™</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 ">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">About</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
        </footer>

      </div>
    </div>
  );
}

function Button() {
  const navigate = useNavigate()
  return <div>
    <button className='mt-2 p-2 text-xl bg-green-500 rounded-md' onClick={() => {
      navigate(`/signup`)
    }}>
      Get Started for free !
    </button>
  </div>
}
