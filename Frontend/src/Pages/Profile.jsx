import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostsList from "../components/PostsList";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [reFetchPost, setReFetchPost] = useState(false);
  const [reFetchUser, setReFetchUser] = useState(false);

  useEffect(() => {
    setLoading(true);
    setUser(null);
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/users/${userId}`);
        setUser(res.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, reFetchUser]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/posts/user/${userId}`
        );
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserPosts();
  }, [userId, reFetchPost]);

  useEffect(() => {
    setLoading(true);
    setUser(null);
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const userData = localStorage.getItem("user");
        setLoginUser(JSON.parse(userData));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFollowUser = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/users/follow?userId=${loginUser.id}&FollowedUserId=${user?.id}`
      );
      setReFetchUser(!reFetchUser);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="w-full flex items-center justify-center flex-col bg-gray-400">
        <div className=" w-[1000px] bg-gray-200 rounded-lg">
          

          <section>
            <img
              className="w-full h-64 object-cover"
              src="https://img.freepik.com/free-vector/flat-social-media-cover-template-gym-exercise_23-2149557488.jpg"
              alt=""
            />
          </section>

          <section className="relative flex justify-center -mt-20">
           
              <img
                className=" w-40 h-40  border-4 border-white rounded-full "
                alt="w"
                src={user?.profileImage}
              />
              </section>
              <section className="p-4">
              <div className="flex justify-between items-center">
              {loginUser?.id !== user?.id ? (
                <button
                  onClick={handleFollowUser}
                  className="bg-blue-700 text-white px-4 py-2 rounded-3xl"
                >
                  {user?.followingUsers?.includes(loginUser?.id)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              ) : null}
            </div>

            <div>
              <div className="flex item-center flex-col">
                <h1 className="font-bold text-lg">{user?.name}</h1>
              </div>
            </div>

            <div className="mt-2 space-y-3">
              <p>Hey there!</p>
              <div className="flex items-center space-x-5">
                <div className="flex items-center space-x-1 font-semibold">
                  <span>{user?.followingCount}</span>
                  <span className="text-gray-500">Following</span>
                </div>
                <div className="flex items-center space-x-1 font-semibold">
                  <span>{user?.followersCount}</span>
                  <span className="text-gray-500">Followers</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="mt-10 ">
          {posts?.map((post, index) => {
            return (
              <PostsList
                post={post}
                user={loginUser}
                key={index}
                reFetchPost={reFetchPost}
                setReFetchPost={setReFetchPost}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
