import Image from "next/image";
import React from "react";

interface UserProfileProps {
  name: string;
  email: string;
  imageUrl: string;
  address: string;
  status: boolean | null;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  address,
  status,
  imageUrl,
}) => {
  return (
    <div className="w-[512px] p-2 flex flex-col gap-2  bg-slate-500 rounded-lg">
      <div className="w-full flex justify-center my-4">
        <Image
          src={imageUrl}
          alt="userImage"
          width={150}
          height={150}
          className="object-cover w-32 h-32 rounded-full "
        />
      </div>
      <div>
        <span className="font-bold">Name: </span>
        <span>{name}</span>
      </div>
      <div>
        <span className="font-bold">Email: </span>
        <span>{email}</span>
      </div>
      <div>
        <span className="font-bold">Address: </span>
        <span>{address}</span>
      </div>
      <div>
        <span className="font-bold">Status: </span>
        {!status ? (
          <span className="text-red-500 font-semibold">Not Voted</span>
        ) : (
          <span className="text-green-500 font-semibold">Voted</span>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
