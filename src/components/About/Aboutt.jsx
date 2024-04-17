import aboutImg from '../../images/Home/About/about.jpg'

function Aboutt() {
  return (
    <section className="container mx-auto px-[40px] font-poppins py-[150px]">
      {/* Heading */}
      <h2 className="font-volkhov font-bold text-[50px] text-[#14183E] text-center mb-[70px]">About this website</h2>
      {/* About info */}
      <div className='flex justify-center gap-10 items-center'>
        {/* about image */}
        <div className="flex-shrink-0 w-[600px] rounded-2xl overflow-hidden"><img src={aboutImg} alt="" /></div>
        {/* About Paragraph */}
        <div>
          <p className='leading-10 text-[20px] text-[#5E6282]'>Welcome to Stay Dz, your premier destination for seamless travel experiences in Algeria and beyond. Our platform offers effortless booking, personalized recommendations, and round-the-clock support to ensure every stay is tailored to your needs. Unlock exclusive deals and discover unforgettable accommodations with us. Start your journey with Stay Dz safely and with high-quality services today.</p>
        </div>
      </div>
    </section>
  )
}

export default Aboutt
