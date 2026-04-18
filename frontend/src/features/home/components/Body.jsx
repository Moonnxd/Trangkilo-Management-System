import background from '../../../assets/images/background.png';
import { useState } from 'react';
import PopUp from "@/features/home/components/popUp.jsx"
import { Button } from "@/components/ui/button"

function Body(){
    const [bookChoice, showChoices] = useState(false);

    return(
        <div 
            className="h-screen bg-cover bg-center flex items-center justify-end"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="w-[90%] h-[60%] md:w-[50%] md:h-[50%] md:w-[50%] xl:h-[50%] text-[#f5f7fa] mr-7">
                
                <span className="sm:text-6xl text-5xl md:text-7xl xl:text-8xl font-bold">Relax.</span>
                <br className="block lg:hidden" />

                <span className="sm:text-6xl md:text-7xl xl:ml-5 md:ml-2 lg:ml-3 text-5xl xl:text-8xl font-bold">Refresh.</span>
                <br/>

                <span className="sm:text-6xl md:text-7xl text-5xl xl:text-8xl font-bold text-[#68ab49]">Rejuvenate.</span>
                <p className="mt-5 ms:mt-5 md:mt-5 lg:mt-8 xl:mt-10
                sm:text-sm md:text-md lg:text-lg xl:text-xl">Book professional massage services anytime, anywhere with ease.</p>

                <Button onClick={() => showChoices(true)} className="px-6 py-3 xl:px-12 xl:py-10
                sm:text-sm md:text-md lg:text-lg xl:text-xl
                rounded sm:rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl  text-white
                mt-5 ms:mt-5 md:mt-5 lg:mt-8 xl:mt-10">Book Now</Button>

                {bookChoice && (
                    <div className="fixed bg-black/40 inset-0 flex items-center justify-center z-50">
                        <PopUp close={() => showChoices(false)}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Body;