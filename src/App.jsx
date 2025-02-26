import { useState, useEffect } from 'react'
import './App.css'
import PasscodeBtn from './Components/PasscodeBtn'
import Heart from './Components/Heart'
import Paw from './Components/Paw'
import { confetti } from "https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm";
import Sorry from './sorry'

function App() {
  const startDate = new Date('2022-10-17T17:00:00');
  const [timeSince, setTimeSince] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [durationText, setDurationText] = useState('');
  const [popupImage, setPopupImage] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [passcodeStatus, setPasscodeStatus] = useState('Enter your Passcode');
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showSorry, setShowSorry] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = now - startDate;

      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 365);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeSince({ years, days, hours, minutes, seconds });


      setDurationText(`${years} Year${years !== 1 ? 's' : ''} and ${days} Day${days !== 1 ? 's' : ''}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getImage(id) {
    // Change /assets/this number/images to other if you want to change images
    return `https://raw.githubusercontent.com/ygisantos/Valentines/refs/heads/main/src/assets/1/image${id}.jpeg`
  }

  function handleImageClick(src) {
    setPopupImage(src);
  }

  function handleClosePopup() {
    setPopupImage(null);
  }

  function handlePasscodeInput(number) {
    if(showContent || passcodeStatus === 'Wrong Passcode... :(') return;
    const newPasscode = passcode + number;
    setPasscode(newPasscode);
    console.log("Input: " + number);
    console.log(newPasscode);

    if (newPasscode === '101722') {
      setShowContent(true);
      runConfetti();
      setPasscodeStatus('Correct Passcode!!!! ❤️');
    } else if (newPasscode.length >= 6) {
      setPasscodeStatus('Wrong Passcode... :(');
      setTimeout(() => {
        setPasscode('');
        setPasscodeStatus('Enter your Passcode');
      }, 2000);
    }
  }

  function runConfetti() {
    const defaults = {
      spread: 360,
      ticks: 200,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["heart"],
      colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"]
    };

    confetti({
      ...defaults,
      particleCount: 100,
      scalar: 2
    });

    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 3
    });

    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 4
    });
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className='flex flex-col gap-5 md:m-24 md:mx-64 m-10 !mt-10 !mb-0 courgette-regular'>
      {/*Passcode Div*/}
      <div className='border-3 border-pink-600 flex flex-row p-10 items-center justify-center gap-5 rounded-sm'>
        <div className='flex flex-col md:flex-row gap-2'>
          <img
            className={`h-[128px] w-auto object-cover md:h-[256px] rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer ${showContent ? '' : 'hidden'}`}
            src={getImage(2)}
            onClick={() => handleImageClick(getImage(2))}/>
          <img
            className={`h-[128px] w-auto object-cover md:h-[256px] rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer ${showContent ? '' : 'hidden'}`}
            src={getImage(5)}
            onClick={() => handleImageClick(getImage(1))}/>
        </div>
        <div className='flex flex-col gap-2'>
          <span className={`font-bold md:text-2xl text-[12px] h-[24px] flex items-center justify-center ${passcodeStatus.includes('Correct') ? 'animate-heartbeat' : ''}`}>
            {passcodeStatus}
          </span>
          <div className='grid grid-cols-3 gap-2'>
            <PasscodeBtn number={1} onClick={() => handlePasscodeInput(1)}/>
            <PasscodeBtn number={2} onClick={() => handlePasscodeInput(2)}/>
            <PasscodeBtn number={3} onClick={() => handlePasscodeInput(3)}/>
            <PasscodeBtn number={4} onClick={() => handlePasscodeInput(4)}/>
            <PasscodeBtn number={5} onClick={() => handlePasscodeInput(5)}/>
            <PasscodeBtn number={6} onClick={() => handlePasscodeInput(6)}/>
            <PasscodeBtn number={7} onClick={() => handlePasscodeInput(7)}/>
            <PasscodeBtn number={8} onClick={() => handlePasscodeInput(8)}/>
            <PasscodeBtn number={9} onClick={() => handlePasscodeInput(9)}/>
            <PasscodeBtn number={"*"} onClick={() => handlePasscodeInput('*')}/>
            <PasscodeBtn number={0} onClick={() => handlePasscodeInput(0)}/>
            <PasscodeBtn number={"#"} onClick={() => handlePasscodeInput('#')}/>
          </div>
        </div>
      </div>
      {/*End of passcode div*/}

      {showContent && (
        <>
          {/*Start of  timer*/}
          <div className='flex flex-col gap-5 bg-pink-200 md:-mx-74 -mx-10 py-5'>
            <div className='flex flex-row justify-center items-center gap-10'>
              <img 
                className='rounded-full object-cover h-[64px] w-[64px] hover:scale-105 transition-transform duration-300 cursor-pointer'
                src={getImage(9)}
                onClick={() => handleImageClick(getImage(9))}/>
              <div className='border-2 rounded-2xl flex justify-center items-center gap-2 p-1 px-10 md:text-[24px] text-[13px]'>
                How long we've been together?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C71585"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>

            <div className='flex justify-center items-center gap-1 font-bold md:text-2xl text-xl'>
              <div className='flex flex-col items-center'>
                <div> 
                  <span className='md:text-8xl text-6xl'>{String(timeSince.years).padStart(2, '0')}</span>
                  &nbsp;:
                </div>
                <span>Years</span>
              </div>
              <div className='flex flex-col items-center'>
                <div> 
                  <span className='md:text-8xl text-6xl'>{String(timeSince.days).padStart(2, '0')}</span>
                  &nbsp;:
                </div>
                <span>Days</span>
              </div>
              <div className='flex flex-col items-center'>
                <div> 
                  <span className='md:text-8xl text-6xl'>{String(timeSince.hours).padStart(2, '0')}</span>
                  &nbsp;:
                </div>
                <span>Hrs</span>
              </div>
              <div className='flex flex-col items-center'>
                <div> 
                  <span className='md:text-8xl text-6xl'>{String(timeSince.minutes).padStart(2, '0')}</span>
                  &nbsp;:
                </div>
                <span>Mins</span>
              </div>
              <div className='flex flex-col items-center'>
                <span className='md:text-8xl text-6xl'>{String(timeSince.seconds).padStart(2, '0')}</span>
                <span>Secs</span>
              </div>
            </div>

            <div className='flex flex-row items-center justify-center mt-10'>
              <button className='bg-pink-400 p-3 px-14 rounded-2xl text-white font-bold hover:bg-pink-500 transition-colors duration-300'>Love</button>
            </div>
            <div className='flex flex-row items-center justify-center gap-2 mt-10 animate-bounce'>
              <Heart />
              <Paw />
              <Heart />
              <Paw />
              <Heart />
            </div>
          </div>
          {/*End of  timer*/}

          {/*Start 6 Pictures */}
          <div className='flex flex-col gap-20'>
            <button className='border-2 rounded-xl p-2 w-[100%] text-center items-center justify-center border-pink-500 flex flex-row gap-2 font-bold hover:bg-pink-500 hover:text-white transition-colors duration-300'> Love <Heart/></button>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-1'>
            <img className='h-[200px] w-full rounded-[4px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(16)} onClick={() => handleImageClick(getImage(16))}/>
              <img className='h-[200px] w-full rounded-[4px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(1)} onClick={() => handleImageClick(getImage(1))}/>
              <img className='h-[200px] w-full rounded-[4px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(3)} onClick={() => handleImageClick(getImage(3))}/>
              <img className='h-[200px] w-full rounded-[4px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(4)} onClick={() => handleImageClick(getImage(4))}/>
              <img className='h-[200px] w-full rounded-[4px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(8)} onClick={() => handleImageClick(getImage(8))}/>
              <img className='h-[200px] w-full rounded-[4px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(9)} onClick={() => handleImageClick(getImage(9))}/>
              <img className='h-[200px] w-full rounded-[4px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(10)} onClick={() => handleImageClick(getImage(10))}/>
              <img className='h-[200px] w-full rounded-[4px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(12)} onClick={() => handleImageClick(getImage(12))}/>
              <img className='h-[200px] w-full rounded-[4px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(13)} onClick={() => handleImageClick(getImage(13))}/>
              <img className='h-[200px] w-full rounded-[4px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(14)} onClick={() => handleImageClick(getImage(14))}/>
              <img className='h-[200px] w-full rounded-[4px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(6)} onClick={() => handleImageClick(getImage(6))}/>
              <img className='h-[200px] w-full rounded-[4px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(15)} onClick={() => handleImageClick(getImage(15))}/>
            </div>
            <button className='rounded-xl p-2 w-[100%] text-center items-center justify-center bg-pink-500 flex flex-row gap-2 text-white font-bold hover:bg-pink-600 transition-colors duration-300'>{durationText} <Heart color='#ffffff'/></button>
          </div>
          {/*End 6 Pictures */}

          {/* Start of message */}
          <div className='flex flex-col gap-5 py-5 p-24'>
          <div className='flex flex-col gap-10 justify-center items-center bg-pink-200 md:-mx-96 -mx-34 p-10 md:px-80'>
            <div className='flex flex-row justify-center gap-3 animate-bounce'>
              <Heart />
              <Heart />
              <Heart />
            </div>

            {/*MESsAGE*/}
            <div className='border-2 rounded-4xl p-5 border-pink-700 shadow-[0px_8px_0px_0px_#ad0074] text-justify text-pink-800 font-semibold'>
              Hi to the most beautiful girl in the world,<br /><br />
              Happy 2nd Valentine’s Day to us! I just want to take a moment to remind you how much you mean to me. You’ve truly been the best girlfriend I could ever ask for, and I’m so grateful to have you in my life. Honestly, I’m running out of words to describe how deeply I feel for you.<br /><br />
              So much has changed in our relationship over time—how we think, how we act, and how we handle life together—but one thing I know for certain is that my love for you will never change. No matter what challenges we face, I will always choose you and fight for us. You are my person, and I’m so lucky to call you mine.<br /><br />
              Will you be my Valentine again this year? I love you more than words can say.<br /><br />
              Always yours,<br />
              Handsome Bf
            </div>
            <button className='rounded-4xl bg-pink-500 w-fit p-2 px-14 text-white font-bold hover:bg-pink-600 transition-colors duration-300'>Love</button>
          </div>
          {/* End of message */}

          <div className='flex flex-col justify-center items-center gap-2 my-6'>
            <button className='border-2 border-pink-500 rounded-4xl p-2 px-6 hover:bg-pink-500 hover:text-white transition-colors duration-300'>
              I Love You So Much!
            </button>
            <img className='m-5 max-h-[512px] object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer' src={getImage(11)} onClick={() => handleImageClick(getImage(11))}/>
            <div 
              onClick={() => setShowSorry(true)}
              className='flex flex-row gap-3 animate-bounce cursor-pointer'>
              <Heart onclick={() => setShowSorry(true)}/>
              <Heart onclick={() => setShowSorry(true)}/>
              <Heart onclick={() => setShowSorry(true)}/>
            </div>
          </div>
          </div>
          {
            showSorry ? <Sorry/> : ''
          }
          {/* Image Popup */}
          {popupImage && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={handleClosePopup}>
              <div className='relative'>
                <button className='rounded-full bg-red-500 w-[40px] h-[40px] z-20 absolute top-2 right-2 text-white text-2xl flex items-center justify-center' onClick={handleClosePopup}>×</button>
                <div className='bg-white p-5 rounded-lg shadow-lg'>
                  <img className='rounded-lg transition-transform duration-300 transform scale-100 opacity-100 max-w-[90vw] max-h-[90vh]' src={popupImage} onClick={(e) => e.stopPropagation()}/>
                </div>
              </div>
            </div>
          )}
          {/* End of Image Popup */}
        </>
      )}
    </div>
  )
}

export default App
