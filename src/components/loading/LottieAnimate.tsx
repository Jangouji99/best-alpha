import React from "react";
import Lottie from "lottie-react";
import sendLoading from '@assets/loading/send-loading.json'

export default function LottieAnimate() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="mb-5">
                <Lottie
                    animationData={sendLoading}
                    loop={true}
                    style={{ width: '300px', height: '300px' }}
                    aria-label="Loading animation"
                />
            </div>
            <p aria-live="polite">Loading...</p>
        </div>

    )
}