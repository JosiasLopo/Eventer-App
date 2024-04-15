import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import { View } from 'react-native';

const Menu = ({ navigation }) => {
  const menuItems = [
    { title: 'Home', screenName: 'Home' },
    // Add additional menu items as needed
  ];

  return (
    <View>
      {menuItems.map((item) => (
        <DrawerItem
          key={item.title}
          label={item.title}
          onPress={() => navigation.navigate(item.screenName)}
        />
      ))}
    </View>
  );
};

export default Menu;
