function Confirm() {

  const handleSubmit = () => {
    
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full h-full">
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 flex flex-col items-start gap-3">
        <label htmlFor="" className="text-2xl font-bold">Your config</label>
        <textarea name="" id="" className="text-white p-3 w-64 md:w-80 lg:w-[40vw] h-36 border-4 border-white bg-transparent rounded-xl focus:outline-none" rows={5}></textarea>
        <button type="submit" className="font-bold bg-gradient-to-r from-light-green via-light-pink to-purpl text-black rounded-lg py-3 px-6 hover:opacity-70">
          Check and connect
        </button>
      </form>
      <div className="w-full md:w-1/2 flex jsutify-center">
        <img src="http://content.vip-status.site/site/themes/dark-1/images/Asset2.png" alt="confirm-image" className="w-full" />
      </div>
    </div>
  )
}

export default Confirm