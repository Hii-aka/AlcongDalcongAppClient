import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import DiaryItem from './DiaryItem';

const dummyData = [
  {
    id: 1,
    title: '발렌타인데이 카페 데이트',
    content: '오늘은 발렌타인데이 카페에 가서 커피를 마셨어요. 카페에서 커피를 마시면서 좋은 시간을 보냈어요.',
    image: 'https://picsum.photos/200/300',
    date: '2024.02.14',
  },
  {
    id: 2,
    title: '남산타워 야경 구경',
    content: '오늘은 남산타워에서 야경을 보았어요. 반짝이는 도시의 불빛이 정말 예뻤어요. 사랑의 자물쇠도 걸고 왔답니다.',
    image: 'https://picsum.photos/200/200',
    date: '2024.02.13',
  },
]

interface DiaryListProps {
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

function DiaryList({ListHeaderComponent}: DiaryListProps) {
  return (
    <FlatList
      data={dummyData}
      renderItem={({item}) => <DiaryItem diary={item} />}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={{paddingBottom: 20}}
    />
  );
}

export default DiaryList;

