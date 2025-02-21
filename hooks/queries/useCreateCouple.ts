import { createCouple } from "@/api/couple";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "@/types";
import Toast from "react-native-toast-message";
interface CreateCoupleVariables {
  receiverEmail: string;
  firstMetDate: string;
}

function useCreateCouple() {
    return useMutation<ApiResponse<string>, Error, CreateCoupleVariables>({
        mutationFn: createCouple,
        onSuccess: (data) => {
            console.log(data);
            Toast.show({
                type: 'success',
                text1: data.message,
            });
        },
        onError: async (error) => {
            
            if (error.response && !error.response.bodyUsed) {
                try {
                  // Blob 데이터를 텍스트로 변환 후 JSON 파싱
                  const text = await error.response.text();
                  const errorData = JSON.parse(text);
                  
                  if (errorData.message) {
                    throw new Error(errorData.message); // 서버에서 보낸 실제 에러 메시지
                  }
                } catch (parseError: any) {
                    console.log('Error parsing response:', parseError);
                    Toast.show({
                        type: 'error',
                        text1: parseError.message,
                    });
                }
              }
        }
    });
}

export default useCreateCouple; 