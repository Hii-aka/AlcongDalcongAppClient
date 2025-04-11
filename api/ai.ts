import { BASE_URL } from './ky';

// 일반 AI 채팅 요청
const requestAiChat = async (question: string, onChunk: (chunk: string) => void) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${BASE_URL}/llm/chat`);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let lastProcessedIndex = 0;

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 3 || xhr.readyState === 4) {
                const newData = xhr.responseText.substring(lastProcessedIndex);
                lastProcessedIndex = xhr.responseText.length;

                if (newData) {
                    const lines = newData.split('\n');
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const chunk = line.substring(6);
                            onChunk(chunk);
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
