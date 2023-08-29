import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";

import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";

type AppRoutes = {
  home: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps = DrawerNavigationProp<AppRoutes>;

const { Navigator, Screen } = createDrawerNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="home" component={Home} />
      <Screen name="profile" component={Profile} />
    </Navigator>
  );
}
