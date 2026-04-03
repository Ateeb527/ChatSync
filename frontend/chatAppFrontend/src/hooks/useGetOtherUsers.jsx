import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from "../config";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;

        const res = await axios.get(`${BASE_URL}/api/v1/user`);

        console.log("other users -> ", res.data);
        

        // ✅ FIXED
        dispatch(setOtherUsers(res.data.otherUsers));
        console.log("FIXED USERS ->", res.data.otherUsers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;