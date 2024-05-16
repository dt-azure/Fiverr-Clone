import logo1 from "../../assets/nav_bar_icon_hire_1.svg";
import logo2 from "../../assets/nav_bar_icon_hire_2.svg";

export const headerText = {
  fiverrPro: {
    item_1: {
      header: "I'm looking to hire",
      desc: "I'd like to work with Pro freelancers and agencies while using free business tools.",
    },
    item_2: {
      header: "I want to offer Pro services",
      desc: "I'd like to work on business projects as a Pro freelancer or agency.",
    },
  },
};

export const fiverrProText = (
  <ul id="navbar__dropdown">
    <li className="mb-4 hover:bg-slate-100 hover:cursor-pointer">
      <a className="flex gap-4 items-center p-4" href="#">
        <img src={logo1}></img>
        <div>
          <p className="font-bold text-lg">I'm looking to hire</p>
          <p>
            I'd like to work with Pro freelancers and agencies while using free
            business tools.
          </p>
        </div>
      </a>
    </li>
    <li className="hover:bg-slate-100 hover:cursor-pointer">
      <a className="flex gap-4 items-center p-4" href="#">
        <img src={logo2}></img>
        <div>
          <p className="font-bold text-lg">I'm looking to hire</p>
          <p>
            I'd like to work with Pro freelancers and agencies while using free
            business tools.
          </p>
        </div>
      </a>
    </li>
  </ul>
);

export const exploreText = (
  <ul>
    <li className="py-2 px-8 hover:bg-slate-100 hover:cursor-pointer">
      <a className="flex flex-col" href="#">
        <span className="font-semibold text-dark">Discover</span>
        <span className="font-semibold text-gray-500">Inspiring projects made on Fiverr</span>
      </a>
    </li>

    <li className="py-2 px-8 hover:bg-slate-100 hover:cursor-pointer">
      <a className="flex flex-col" href="#">
        <span className="font-semibold text-dark">Community</span>
        <span className="font-semibold text-gray-500">Connect with Fiverr's team and community</span>
      </a>
    </li>

    <li className="py-2 px-8 hover:bg-slate-100 hover:cursor-pointer">
      <a className="flex flex-col" href="#">
        <span className="font-semibold text-dark">Guides</span>
        <span className="font-semibold text-gray-500">In-depth guides covering business topics</span>
      </a>
    </li>

    <li className="py-2 px-8 hover:bg-slate-100 hover:cursor-pointer">
      <a className="flex flex-col" href="#">
        <span className="font-semibold text-dark">Podcast</span>
        <span className="font-semibold text-gray-500">Inside tips from top business minds</span>
      </a>
    </li>

    <li className="py-2 px-8 hover:bg-slate-100 hover:cursor-pointer">
      <a className="flex flex-col" href="#">
        <span className="font-semibold text-dark">Learn</span>
        <span className="font-semibold text-gray-500">Professional online courses, led by experts</span>
      </a>
    </li>

    <li className="py-2 px-8 hover:bg-slate-100 hover:cursor-pointer">
      <a className="flex flex-col" href="#">
        <span className="font-semibold text-dark">Blog</span>
        <span className="font-semibold text-gray-500">News, information and community stories</span>
      </a>
    </li>

    <li className="py-2 px-8 hover:bg-slate-100 hover:cursor-pointer">
      <a className="flex flex-col" href="#">
        <span className="font-semibold text-dark">Logo Maker</span>
        <span className="font-semibold text-gray-500">Create your logo instantly</span>
      </a>
    </li>
  </ul>
);