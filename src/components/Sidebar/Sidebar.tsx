import { TabNav } from "@radix-ui/themes";
import {
  CubeIcon,
  GearIcon,
  TextAlignJustifyIcon,
} from "@radix-ui/react-icons";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles["wrapper"]}>
      <TabNav.Root wrap="wrap" size="2" className={styles.menu} highContrast>
        <TabNav.Link href="#" className="d-flex">
          <TextAlignJustifyIcon width={22} height={22} />
        </TabNav.Link>
        <TabNav.Link href="#">
          <GearIcon width={22} height={22} />
        </TabNav.Link>
        <TabNav.Link href="#">
          <CubeIcon width={22} height={22} />
        </TabNav.Link>
      </TabNav.Root>
    </div>
  );
};

export default Sidebar;
