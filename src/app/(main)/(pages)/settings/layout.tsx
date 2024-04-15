import NavMenu from "@/components/navMenu";
import PageBanner from "@/components/pageBanner";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageBanner add={false}>
        <div className="absolute bottom-0 left-0 px-2 md:px-36 lg:px-[15rem]">
          <NavMenu className="gap-2" data={settingsMenu} />
        </div>
      </PageBanner>
      <div className="px-2 md:px-36 lg:px-[15rem] mt-4">{children}</div>
    </div>
  );
}

export default layout;
const settingsMenu = [
  {
    name: "Workspace",
    link: "/settings",
    disabled: false,
  },
  {
    name: "Api keys",
    link: "/settings/keys",
    disabled: false,
  },
  {
    name: "Logs",
    link: "/settings/logs",
    disabled: false,
  },
  {
    name: "Profile",
    link: "/settings/profile",
    disabled: false,
  },
];
