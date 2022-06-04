import { useEffect, useState } from 'react';

const useAdmin = (user) => {
    const [adminList, setAdminList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
       if(user){
        fetch("http://localhost:5000/getAdmins")
        .then((res) => res.json())
        .then((data) => {
          setAdminList(data);
        });
       }
      }, [user]);
      const email = user?.email

      useEffect(() => {
        const checkAdmin = () => {
          const admin = adminList.find((admin) => admin?.email === email);
          setIsAdmin(Boolean(admin))
        }
        checkAdmin()
      }, [adminList, user, email]);
      console.log(isAdmin);
    return [isAdmin];
};

export default useAdmin;