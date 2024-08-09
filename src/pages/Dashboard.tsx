import Nav from "../components/Nav";
import { useAuth } from "../context/SignUpAuth";
const Dashboard = () => {
const{username} = useAuth()

  return (
    <>
    <Nav/>
    <div className=" h-screen mx-20 my-10 p-6 bg-stone-100 bg-opacity-55  rounded-lg border border-emerald-500 shadow-md">
    <h2 className="text-4xl py-3 font-medium text-gray-700 text-center">Welcome, <span className="text-emerald-500">{username}!</span></h2>
    </div>
    </>
  );
};

export default Dashboard;