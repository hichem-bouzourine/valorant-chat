
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="text-lg font-bold mb-4 lg:mb-0">Valorant Match Results</div>
          <div className="mb-4 lg:mb-0">
            <p className="text-sm">Subscribe to our newsletter</p>
            <form className="flex mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="text-sm ml-0 lg:ml-6 mt-6 lg:mt-0">
            <p>&copy; {new Date().getFullYear()} All rights reserved</p>
            <p>Created by: </p>  
            <p className="font-satoshi">BOUZOURINE Hichem & Rajith Ravindran</p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
