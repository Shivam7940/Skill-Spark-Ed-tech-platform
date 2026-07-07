import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));

    axios.get('http://localhost:5000/api/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-[#0B1120] font-bold">
            ⚡
          </div>
          <span className="text-white font-semibold text-lg">Skill Spark</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-300 text-sm">Hi, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-10">
        <h1 className="text-2xl font-serif text-white mb-2">Explore Courses</h1>
        <p className="text-slate-400 mb-8">Pick something new to learn today.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.length === 0 && (
            <p className="text-slate-500">No courses added yet.</p>
          )}
          {courses.map((course) => (
            <div key={course._id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-amber-400/50 transition-colors">
              <span className="text-xs text-amber-400 font-medium">{course.category}</span>
              <h3 className="text-white font-semibold text-lg mt-1 mb-2">{course.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{course.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">By {course.instructor}</span>
                <span className="text-white font-semibold">₹{course.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;