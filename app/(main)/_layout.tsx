import { Drawer } from 'expo-router/drawer';

export default function MainLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: '홈',
        }}
      />
      
    </Drawer>
  );
} 