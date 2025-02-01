function LoadingLayout() {
    return (
        <div className="Loading_modal">
            <div className='Loading_loader'>
                <div className='Loading_panWrapper'>
                    <div className='Loading_pan'>
                        <div className='Loading_food'></div>
                        <div className='Loading_panBase'></div>
                        <div className='Loading_panHandle'></div>
                    </div>
                    <div className='Loading_panShadow'></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingLayout;