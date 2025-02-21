export const MOODS = [
    { 
        id: 'happy', 
        icon: 'grin-hearts',   // 하트 눈을 가진 행복한 표정
        text: '너무 행복해',
        activeColor: '#F472B6', // Pink-400 (더 부드러운 톤)
        bgColor: '#FCE7F3',     // Pink-100 (더 부드러운 배경)
        borderColor: '#FBCFE8',
        inactiveColor: '#FDA4AF', // 부드러운 핑크 색상 추가
      },
      { 
        id: 'good', 
        icon: 'kiss-beam',     // 키스하는 표정
        text: '설레여',
        activeColor: '#F472B6',
        bgColor: '#FCE7F3',
      },
      { 
        id: 'neutral', 
        icon: 'kiss-wink-heart', // 윙크하는 표정
        text: '달달해',
        activeColor: '#F472B6',
        bgColor: '#FCE7F3',
      },
      { 
        id: 'sad', 
        icon: 'sad-cry',       // 눈물 흘리는 표정
        text: '보고싶어',
        activeColor: '#F472B6',
        bgColor: '#FCE7F3',
      },
      { 
        id: 'angry', 
        icon: 'heart-broken',  // 깨진 하트
        text: '삐졌어',
        activeColor: '#F472B6',
        bgColor: '#FCE7F3',
      },
  ] as const;
  
  export type MoodType = typeof MOODS[number]['id'];