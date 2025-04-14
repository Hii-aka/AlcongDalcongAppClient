import { Platform } from 'react-native';

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

export {
    requestAiChat,
};
