import { Link } from "react-router-dom";

const Navbar = ({ navContent }) => {
  return (
    <nav className="flex-1 space-y-2">
       {navContent.map((item,index) =>  <Link
       key={index}
        to={item.path}
        className="flex gap-2 capitalize items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group"
      >
        {item?.icon}
        {item.name}
      </Link>)}
    </nav>
  );
};

export default Navbar;
