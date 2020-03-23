interface Tabs {
  name: string;
  index: number;
}

interface StateComponent {
  currentTab: number;
  tabs: Tabs[];
  isLogin: boolean;
  userInfo: {
    username: string;
  };
}
