export default function PlayPage(props) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center mb-20">
                <img
                    src={props.videoInfo ? props.videoInfo.thumbnail_url : ''}
                    alt={props.videoInfo ?  props.videoInfo.title : ''}
                    className="rounded-xl w-1/5 mr-12"
                ></img>
                <span className="font-bold text-lg">
                    {props.videoInfo ? props.videoInfo.title : ''}
                </span>
            </div>
            <h1 className="text-2xl w-full text-center mb-8">Deze moet vaker terugkomen?</h1>
            <div className="sm:w-2/3 mx-auto flex justify-around">
                <span className="flex p-4 bg-rose-600 rounded-full">
                    <svg className="w-10 h-10 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"></path></svg>
                </span>
                <span className="flex p-4 bg-lime-600 rounded-full">
                    <svg className="w-10 h-10 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path></svg>
                </span>
            </div>
            
        </div>
    )
}