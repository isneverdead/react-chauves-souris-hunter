import logo from '../logo_app.svg'

const Idle = ({ handleGameState }) => {
  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div className=""></div>
        <div className="w-full px-8 flex flex-col items-center">
          <img className="w-24 h-24 lg:w-16 lg:h-16" src={logo} alt="logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
            tempora temporibus consequuntur facere ipsa, mollitia laudantium
            totam, id dolore provident alias!
          </p>
          <button
            onClick={() => handleGameState('countDown')}
            className="px-5 py-2 rounded-xl shadow-lg mt-10 font-semibold font-sans text-white text-2xl bg-red-300"
          >
            Let's Play
          </button>
        </div>
        <h1 className="">Lorem.</h1>
      </div>
    </>
  )
}

export default Idle
