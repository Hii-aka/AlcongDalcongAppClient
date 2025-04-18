import { Platform } from 'react-native';
import { RecommendationOptions } from '@/components/chat/RecommendationOptions';

// 일반 AI 채팅 요청
const requestAiChat = async (question: string, onChunk: (chunk: string) => void) => {
    const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${baseUrl}/llm/chat`);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let buffer = '';
        let lastProcessedIndex = 0;
        let lastChunk = '';
        let isListStart = false;

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 3 || xhr.readyState === 4) {
                const newData = xhr.responseText.substring(lastProcessedIndex);
                lastProcessedIndex = xhr.responseText.length;

                if (newData) {
                    const lines = newData.split('\n');
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const chunk = line.substring(6);

                            if (chunk === '') {
                                if (lastChunk === '') {
                                    onChunk('\n\n');
                                } else {
                                    onChunk(' ');
                                }
                            } else {
                                if (chunk.trim() === '-' || chunk.trim() === '*') {
                                    isListStart = true;
                                    onChunk('\n' + chunk);
                                } else if (isListStart && chunk.trim() === ' ') {
                                    onChunk('\n- ');
                                    isListStart = false;
                                } else {
                                    onChunk(chunk);
                                    isListStart = false;
                                }
                            }

                            lastChunk = chunk;
                        }
                    }
                }

                if (xhr.readyState === 4) {
                    if (xhr.status === 201) {
                        resolve(null);
                    } else {
                        reject(new Error(`HTTP error! status: ${xhr.status}`));
                    }
                }
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network error'));
        };

        xhr.send(JSON.stringify({ question }));
    });
};

// 옵션 기반 데이트 코스 추천 요청
const requestDateCourseRecommendation = async (options: RecommendationOptions, onChunk: (chunk: string) => void) => {
    const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
    const queryParams = new URLSearchParams();

    if (options.mood) {
        queryParams.append('mood', options.mood === 'custom' ? options.customMood : options.mood);
    }

    if (options.location) {
        queryParams.append('location', options.location);
    }

    if (options.budget) {
        queryParams.append('budget', options.budget);
    }

    if (options.region && options.region.length > 0) {
        const regionValues = options.region.includes('custom')
            ? [...options.region.filter(r => r !== 'custom'), options.customRegion]
            : options.region;

        regionValues.forEach(region => {
            queryParams.append('region', region);
        });
    }

    if (options.time && options.time.length > 0) {
        options.time.forEach(time => {
            queryParams.append('time', time);
        });
    }

    if (options.special && options.special.length > 0) {
        const specialValues = options.special.includes('custom')
            ? [...options.special.filter(s => s !== 'custom'), options.customSpecial]
            : options.special;

        specialValues.forEach(special => {
            queryParams.append('special', special);
        });
    }

    const url = `${baseUrl}/llm/date?${queryParams.toString()}`;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        let lastProcessedIndex = 0;
        let lastChunk = '';
        let isListStart = false;

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 3 || xhr.readyState === 4) {
                const newData = xhr.responseText.substring(lastProcessedIndex);
                lastProcessedIndex = xhr.responseText.length;

                if (newData) {
                    const lines = newData.split('\n');
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const chunk = line.substring(6);

                            if (chunk === '') {
                                if (lastChunk === '') {
                                    onChunk('\n\n');
                                } else {
                                    onChunk(' ');
                                }

                                lastChunk = chunk;

                                continue;
                            }

                            if (chunk.trim() === '-' || chunk.trim() === '*') {
                                isListStart = true;
                                onChunk('\n' + chunk);

                                lastChunk = chunk;

                                continue;
                            }

                            if (isListStart && chunk.trim() === ' ') {
                                onChunk('\n- ');
                                isListStart = false;

                                lastChunk = chunk;

                                continue;
                            }

                            onChunk(chunk);
                            isListStart = false;

                            lastChunk = chunk;
                        }
                    }
                }

                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(null);
                    } else {
                        reject(new Error(`HTTP error! status: ${xhr.status}`));
                    }
                }
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network error'));
        };

        xhr.send();
    });
};

export {
    requestAiChat,
    requestDateCourseRecommendation,
};
