import Link from "next/link"
import Image from "next/image"
import thankyou from '@/assets/thankYou.png'



export default function OrderConfirmationForm() {
 

    return (
        <div className="min-h-screen bg-[#F3F2F2] flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
               

                <div className="flex justify-center">
                    <Image src={thankyou} width={230} height={230} alt="thank_you" />
                </div>

                <div className="mt-6 text-center">

                    <h2 className="text-[#333333] text-[28px] font-semibold">We will send
                        you an email to confirm your order</h2>
                </div>
                <div className="mt-6 text-center">
                    
                    <Link href="/orders" className="text-gray-600 hover:text-gray-800 text-sm">
                        Back to Previous page
                    </Link>
                </div>
            </div>
        </div>
    )
}

