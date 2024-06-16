import { loader } from "../assets"

export default function Loader({message}) {
    return (
        <div className="fixed inset-0 z-10 h-screen bg-black/70
        flex justify-center items-center flex-col">
            <img src={loader} alt="loader" className="w-[40px] h-[100px] object-contain" />
            <p className="mt-[20px] font-epilogue font-bold text-white text-[20px] text-center">
                {message} <br/>Please wait...
            </p>
        </div>
    )
}