import { CustomDrawer } from "@components/CustomDrawer";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";

import { House, User } from "phosphor-react-native";

import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";
import { useTheme } from "styled-components/native";

type AppRoutes = {
  home: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps = DrawerNavigationProp<AppRoutes>;

const { Navigator, Screen } = createDrawerNavigator<AppRoutes>();

export function AppRoutes() {
  const { COLORS, FONT_FAMILY, FONT_SIZE } = useTheme();

  return (
    <Navigator 
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: COLORS.BRAND_LIGHT,
        drawerActiveTintColor: COLORS.WHITE,
        drawerInactiveTintColor: COLORS.GRAY_600,
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: FONT_FAMILY.REGULAR,
          fontSize: FONT_SIZE.MD
        }
      }}
    >
      <Screen 
        name="home" 
        component={Home} 
        options={{
          drawerIcon: ({color}) => {
            return <House size={22} color={color} />
          }
        }}
      />
      <Screen 
        name="profile" 
        component={Profile} 
        options={{
          drawerIcon: ({color}) => {
            return <User size={22} color={color} />
          }
        }}
      />
    </Navigator>
  );
}
