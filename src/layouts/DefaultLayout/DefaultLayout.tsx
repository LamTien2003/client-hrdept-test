import { Outlet } from "react-router-dom";

import Sidebar from "@/components/Sidebar/Sidebar";

import styles from "./DefaultLayout.module.css";

const DefaultLayout = () => {
  return (
    <div className={styles["container"]}>
      <Sidebar />
      <div className={styles["container__main-content"]}>
        <Outlet />
      </div>
    </div>
  );
};
export default DefaultLayout;
