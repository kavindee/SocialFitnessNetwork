import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import TimeAgo from "./TimeAgo";
import axios from "axios";
import toast from "react-hot-toast";

export const SharedPostlist = ({
  post,
  user,
  reFetchSharedPost,
  setReFetchSharedPost,
}) => {
  console.log(post, user, reFetchSharedPost, setReFetchSharedPost);

  const sharedPostDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/share/${post.id}`);
      setReFetchSharedPost(!reFetchSharedPost);
      toast.success("Post deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="">
        <div className="h-full w-full bg-gray-400 flex items-center justify-center">
          <div className="border max-w-screen-sm bg-white mt-6 rounded-2xl p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
            <div className="flex items-center justify-between " >
              <div className="gap-3.5	flex items-center ">
                <img
                  src={post?.sharedBy?.profileImage}
                  alt=""
                  className="object-cover bg-yellow-500 rounded-full w-10 h-10"
                />
                <div className="flex flex-col">
                  <b className="mb-1 capitalize">{post?.sharedBy?.name}</b>
                  <p className="text-sm">shared this post</p>
                </div>
              </div>
              <div className="bg-gray-100	rounded-full h-3.5 flex	items-center justify-center gap-3">
                {user?.id === post?.sharedBy?.id && (
                  <>
                    <AiFillDelete
                      size={20}
                      color="red"
                      className="cursor-pointer"
                      onClick={sharedPostDelete}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="mb-2 border-b">
              <p className="mt-1 text-sm text-gray-700 p-3">
                {post.description}
              </p>
            </div>
            <div className="flex items-center	justify-between">
              <div className="gap-3.5	flex items-center ">
                <img
                  src={post?.post?.userProfile}
                  alt=""
                  className="object-cover bg-yellow-500 rounded-full w-10 h-10"
                />
                <div className="flex flex-col">
                  <b className="mb-2 capitalize">{post?.post?.username}</b>
                  <time datetime="06-08-21" className="text-gray-400 text-xs">
                    <TimeAgo date={post?.post?.date} />
                  </time>
                </div>
              </div>
              <div className="bg-gray-100	rounded-full h-3.5 flex	items-center justify-center gap-3"></div>
            </div>
            <div className="whitespace-pre-wrap mt-7 font-bold ">
              {post?.post?.title}
            </div>
            <p className="mt-1 text-sm text-gray-700">
              {post?.post?.description}
            </p>
            <div className="mt-5 flex gap-2	 justify-center border-b pb-4 flex-wrap	w-[600px] max-w-[700px]">
              {post?.post?.images?.length === 3 ? (
                <>
                  <img
                    src={post?.post?.images[0]}
                    alt=""
                    className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                  />
                  <img
                    src={post?.post?.images[1]}
                    alt=""
                    className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                  />
                  <img
                    src={post?.post?.images[2]}
                    alt=""
                    className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                  />
                </>
              ) : post?.post?.images?.length === 2 ? (
                <>
                  <img
                    src={post?.post?.images[0]}
                    alt=""
                    className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                  />
                  <img
                    src={post?.post?.images[1]}
                    alt=""
                    className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                  />
                </>
              ) : post?.post?.images?.length === 1 ? (
                <img
                  src={post?.post?.images[0]}
                  alt=""
                  className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                />
              ) : (
                <>
                  <video
                    controls
                    className="mt-3"
                    style={{ maxWidth: "570px", height: "auto" }}
                  >
                    <source src={post?.post?.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
