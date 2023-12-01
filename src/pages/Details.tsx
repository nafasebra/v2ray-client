import ActiveChart from "@/components/pice/ActiveChart";
import QRCodeContainer from "@/components/pice/QRCodeContainer";
import AppLinksSection from "@/components/status/AppLinksSection";

function Details() {
  return (
    <section className="container mx-auto flex flex-col lg:flex-row gap-20 min-h-[calc(100vh-100px)] p-6">
      <aside className="w-full lg:w-[20%] space-y-3">
        <div className="gradient py-2 px-4 rounded-lg font-bold text-3xl text-black text-center">
          15dzzx1..
        </div>
        <QRCodeContainer valueQrCode="fsdf35465" />
        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-full py-2 px-6 font-bold text-black gradient">
            Copy
          </button>
          <button className="rounded-full py-2 px-6 font-bold text-black gradient">
            Change
          </button>
        </div>
      </aside>
      <article className="w-full lg:w-[60%]">
        <div className="space-y-5 border border-white rounded-lg p-3">
          <h2 className="text-center text-3xl font-bold gradient text-transparent bg-clip-text">
            Traffic
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <p className="font-bold gradient bg-clip-text text-transparent">Active</p>
            </div>
            <ActiveChart />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-bold gradient bg-clip-text text-transparent">Expire</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="font-bold gradient bg-clip-text text-transparent">Total Traffic</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="font-bold gradient bg-clip-text text-transparent">Total Usage</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="font-bold gradient bg-clip-text text-transparent">Download</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="font-bold gradient bg-clip-text text-transparent">Upload</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <button className="rounded-full py-2 px-6 font-bold text-black gradient">
              Copy status
            </button>
            <button className="rounded-full py-2 px-6 font-bold text-black gradient">
              Share status
            </button>
          </div>
        </div>
      </article>
      <aside className="w-full lg:w-[20%]">
        <AppLinksSection />
      </aside>
    </section>
  );
}

export default Details;
